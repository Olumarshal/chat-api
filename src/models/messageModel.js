const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Message extends Model {}

Message.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Message',
  }
);

Message.associate = (models) => {
  Message.belongsTo(models.ChatRoom);
  Message.belongsTo(models.User);
};

module.exports = Message;
