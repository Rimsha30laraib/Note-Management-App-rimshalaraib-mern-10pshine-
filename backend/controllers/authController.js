//add get userinfo in last
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const logger = require('../utils/logger'); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

exports.signup = async (req, res) => {

  const { username,email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      logger.warn(`Signup failed: User already exists (${email})`);

      return res.status(400).json({ message: 'User already exists' });

    }



    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });



    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });



    logger.info(`New user signed up: ${email}`);

    res.status(201).json({ token, username: newUser.username });

  } catch (err) {

    logger.error(`Signup error for ${email}: ${err.message}`);

    res.status(500).json({ message: 'Signup failed', error: err.message });

  }

};



exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {

      logger.warn(`Login failed: User not found (${email})`);

      return res.status(404).json({ message: 'User not found' });

    }



    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      logger.warn(`Login failed: Invalid credentials (${email})`);

      return res.status(401).json({ message: 'Invalid credentials' });

    }



    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });



    logger.info(`User logged in: ${email}`);

    res.status(200).json({ token, username: user.username });

  } catch (err) {

    logger.error(`Login error for ${email}: ${err.message}`);

    res.status(500).json({ message: 'Login failed', error: err.message });

  }

};



exports.forgotPassword = async (req, res) => {

  const { email } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {

      logger.warn(`Forgot Password: User not found (${email})`);

      return res.status(404).json({ message: 'User not found' });

    }



    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiry = Date.now() + 10 * 60 * 1000;



    user.resetToken = otp;

    user.resetTokenExpiry = expiry;



    await user.save().catch(err => {

      logger.error(`Error saving OTP for ${email}: ${err.message}`);

      throw new Error("Error saving OTP");

    });



    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: 'Your Password Reset OTP',

      html: `<h3>Reset OTP</h3><p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,

    });



    logger.info(`OTP sent to ${email}`);

    res.status(200).json({ message: 'OTP sent to email' });

  } catch (err) {

    logger.error(`Forgot password error for ${email}: ${err.message}`);

    res.status(500).json({ message: 'Error sending OTP', error: err.message });

  }

};



exports.verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  try {

    const user = await User.findOne({

      email,

      resetToken: otp,

      resetTokenExpiry: { $gt: Date.now() },

    });



    if (!user) {

      logger.warn(`OTP verification failed for ${email}: Invalid/expired OTP`);

      return res.status(400).json({ message: 'Invalid or expired OTP' });

    }



    logger.info(`OTP verified for ${email}`);

    res.status(200).json({ message: 'OTP verified' });

  } catch (err) {

    logger.error(`OTP verification error for ${email}: ${err.message}`);

    res.status(500).json({ message: 'Error verifying OTP', error: err.message });

  }

};



exports.resetPassword = async (req, res) => {

  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {

    logger.warn(`Reset password: Missing fields for ${email}`);

    return res.status(400).json({ message: 'Email, OTP, and new password are required.' });

  }



  try {

    const user = await User.findOne({

      email,

      resetToken: otp,

      resetTokenExpiry: { $gt: Date.now() },

    });



    if (!user) {

      logger.warn(`Reset password failed for ${email}: Invalid/expired OTP`);

      return res.status(400).json({ message: 'Invalid or expired OTP' });

    }



    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;

    user.resetToken = undefined;

    user.resetTokenExpiry = undefined;

    await user.save();



    logger.info(`Password reset successful for ${email}`);

    res.status(200).json({ message: 'Password reset successful' });

  } catch (err) {

    logger.error(`Password reset error for ${email}: ${err.message}`);

    res.status(500).json({ message: 'Error resetting password', error: err.message });

  }

};



exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user info", error: err.message });
  }
};
