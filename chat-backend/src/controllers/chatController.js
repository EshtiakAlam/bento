const Chat = require('../models/Chat');


module.exports.get_byID = async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: { chat_id: req.params.chatId },
            order: [['timestamp', 'ASC']]
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.post = async (req, res) => {
    try {
        const { chat_id, content } = req.body;
        const { email, username } = req.user;
        const message = await Message.create({
            chat_id,
            sender_email: email,
            sender_username: username,
            content
        });
        res.status(201).json(message);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
