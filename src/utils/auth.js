const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
