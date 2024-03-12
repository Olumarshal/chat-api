const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with hashed password
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(user.id);

    res
      .status(201)
      .json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error(error);

    // Handle specific bcrypt errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ error: 'User with this email already exists' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Stored Hashed Password (Login):', user.password);

    const token = generateToken(user.id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
