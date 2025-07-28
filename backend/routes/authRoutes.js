// add routes to get user info
const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp,
  getUserInfo,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // if not already

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-otp', verifyOtp);


router.get('/me', authMiddleware, getUserInfo);

module.exports = router;
