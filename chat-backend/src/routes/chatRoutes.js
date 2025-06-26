const { Router } = require('express');
const chatController = require('../controllers/chatController.js');

const router = Router();

router.get('/:chat_id', chatController.get_byID);
router.post('/', chatController.post);

module.exports = router;
