const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { register, login, googleCallback } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/google/callback', protect, googleCallback);

module.exports = router;
