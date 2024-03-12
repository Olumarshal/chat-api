const Message = require('../models/messageModel');
const { io } = require('../../index');
const ChatRoom = require('../models/chatRoomModel');

const RedisCache = require('../config/redis');
const redisCache = new RedisCache();

exports.chat = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, userId } = req.body;

    const savedMessage = await Message.create({
      content: message,
      UserId: userId,
      ChatRoomId: id,
    });

    const cacheKey = `chat:${id}:messages`;
    const cachedMessages = await redisCache.get(cacheKey);

    if (cachedMessages) {
      // If there are cached messages, parse and append the new message
      const messages = JSON.parse(cachedMessages);
      messages.push({
        message: savedMessage.content,
        userId: savedMessage.UserId,
      });
      await redisCache.set(cacheKey, JSON.stringify(messages));
    } else {
      // If no cached messages, create a new array with the current message
      const messages = [
        { message: savedMessage.content, userId: savedMessage.UserId },
      ];
      await redisCache.set(cacheKey, JSON.stringify(messages), 3600);
    }

    // Broadcast the message to all connected clients
    io.emit(`chat:${id}:message`, { userId, message });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
