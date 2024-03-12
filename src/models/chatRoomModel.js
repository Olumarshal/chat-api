const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatRoom = sequelize.define('ChatRoom', {
  room_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ChatRoom.associate = (models) => {
  ChatRoom.hasMany(models.Message);
};

module.exports = ChatRoom;
