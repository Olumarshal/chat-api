import jwt from 'jsonwebtoken';

const createToken = async ({ id, role }) => {
  console.log(process.env.JWT_SECRET);
  const secret = process.env.JWT_SECRET || '';
  return jwt.sign({ id, role }, secret, { expiresIn: '1d' });
};

module.exports = createToken;
