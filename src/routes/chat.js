const express = require('express');
const { chat } = require('../controllers/chatController');

const router = express.Router();

// User Management Routes
router.post('/:id/messages', chat);

module.exports = router;
