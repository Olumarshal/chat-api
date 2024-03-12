const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.associate = (models) => {
  User.hasMany(models.Message);
};

User.beforeCreate(async (user) => {
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
});


module.exports = User;
