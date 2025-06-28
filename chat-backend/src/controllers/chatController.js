const Chat = require('../models/Chat');
const { Op } = require('sequelize');


module.exports.get = async (req, res) => {
    try {
        const email = req.user?.email
        if (!email) {
            return res.status(401).json({ error: 'Unauthorized: No user cookie found' });
        }

        const chats = await Chat.findAll({
            where: {
                [Op.or]: [{ user1_email: email }, { user2_email: email }]
            },
            order: [['updatedAt', 'DESC']]
        })
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.post = async (req, res) => {
    try {
        const user1_email = req.user?.email
        const user2_email = req.body.user2_email;

        console.log('Creating chat for:', user1_email, 'and', user2_email);
        if (!user1_email || !user2_email) {
            return res.status(400).json({ error: 'Bad Request: Missing user emails' });
        }
        const chat = await Chat.create({
            user1_email,
            user2_email
        });
        res.status(201).json(chat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

