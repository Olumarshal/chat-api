const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const username = process.env.DB_USERNAME || '';
const database = process.env.DB_DATABASE || '';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '';
const dialect = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { connect, sequelize };
