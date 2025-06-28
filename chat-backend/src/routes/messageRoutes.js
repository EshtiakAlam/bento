const {Router} = require('express');
const messageController = require('../controllers/messageController.js');

const router = Router();

router.get('/:chat_id', messageController.get_by_chat_id);
router.post('/:chat_id', messageController.post);

module.exports = router;