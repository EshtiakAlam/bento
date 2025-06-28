const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Chat = require('./Chat');

const Message = sequelize.define('Message', {
  chat_id: { type: DataTypes.UUID, allowNull: false },
  sender_email: { type: DataTypes.STRING, allowNull: false },
  sender_username: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// A Chat can have many Messages; establish the one-to-many relationship.
// Each Message belongs to a single Chat, referenced by chat_id
Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });

module.exports = Message;