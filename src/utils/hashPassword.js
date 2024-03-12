import bcrypt from 'bcrypt';

const SALT = Number(process.env.SALT);

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, SALT);
  return hash;
};

module.exports = hashPassword;
