const { io } = require('../../index');
const { ChatRoom, Message, User } = require('../models');

const RedisCache = require('../config/redis');
const redisCache = new RedisCache();

exports.createChatRoom = async (req, res) => {
  try {
    const { roomName } = req.body;

    // Create a new chat room
    const chatRoom = await ChatRoom.create({ room_name: roomName });

    res.status(201).json({ chatRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.allChatRooms = async (req, res) => {
  try {
    // List available chat rooms
    const chatRooms = await ChatRoom.findAll();

    res.status(200).json({ chatRooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.chats = async (req, res) => {
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
