const Message = require('../models/Message');
const Chat = require('../models/Chat');


module.exports.get_by_chat_id = async (req, res) => {
    try {
        const chatId = req.params.chat_id;
        const messages = await Message.findAll({
            where: { chat_id: chatId },
            order: [['timestamp', 'DESC']]
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports.post = async (req, res) => {
    try {
        const chat_id = req.params.chat_id;
        const content = req.body.content;
        const { email, username } = req.user;
        const current_time = new Date();
        console.log('chat_id', chat_id, 'current_time', current_time);
        const message = await Message.create({
            chat_id,
            sender_email: email,
            sender_username: username,
            content
        });
        const chat = await Chat.update(
            {
                id: chat_id,
                updatedAt: current_time
            },
            { where: { id: chat_id } }
        );

        console.log('chat updated:', chat);
        res.status(201).json(message);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
