const express = require('express');
const { chats, createChatRoom, allChatRooms } = require('../controllers/chatController');
const verifyToken = require('../utils/auth')

const router = express.Router();

// User Management Routes
router.post('/chat', verifyToken, createChatRoom)
router.get('/chat', allChatRooms)
router.get('/chat/:id/messages', chats);

module.exports = router;
