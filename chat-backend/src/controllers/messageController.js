const Chat = require('../models/Message');


module.exports.get = async (req, res) => {
    try {
        const messages = await Chat.findAll({
            where: { chatId: req.query.chatId },
            order: [['createdAt', 'ASC']]
        });

        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.post = async (req, res) => {
    try {
        const { user1_email, user2_email } = req.body;
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
