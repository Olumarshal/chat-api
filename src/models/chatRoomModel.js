const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class ChatRoom extends Model {}

ChatRoom.init(
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ChatRoom',
  }
);

ChatRoom.associate = (models) => {
  ChatRoom.hasMany(models.Message, { foreignKey: 'ChatRoomId' });
};

module.exports = ChatRoom;
