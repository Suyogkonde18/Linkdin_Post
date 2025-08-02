const express = require("express");
const router = express.Router();
const auth = require('../middelware/authMiddleware'); // ✅ Correct spelling

const { register, login, getMe } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth.protect, getMe);

module.exports = router;
