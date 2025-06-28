const { Router } = require('express');
const chatController = require('../controllers/chatController.js');

const router = Router();

router.get('/', chatController.get);
router.post('/', chatController.post);

module.exports = router;
