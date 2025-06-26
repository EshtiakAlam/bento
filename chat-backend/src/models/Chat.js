const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chat = sequelize.define(
    'Chat',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user1_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
            user2_email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
        }
    );

module.exports = Chat;
