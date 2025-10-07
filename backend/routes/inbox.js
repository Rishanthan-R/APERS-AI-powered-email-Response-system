const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { fetchInbox, replyEmail } = require('../controllers/inboxController');

router.get('/', protect, fetchInbox);
router.post('/reply/:emailId', protect, replyEmail);

module.exports = router;
