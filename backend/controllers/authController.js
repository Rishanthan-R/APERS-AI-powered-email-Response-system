const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { getAuthUrl, getTokens } = require('../services/gmailService');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ message:'User already exists' });

    user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);
    const gmailAuthUrl = getAuthUrl();
    res.status(201).json({ token, gmailAuthUrl });

  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message:'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if(!isMatch) return res.status(400).json({ message:'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ token });

  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  if(!code) return res.status(400).json({ message:'Authorization code missing' });

  try {
    const tokens = await getTokens(code);
    const user = await User.findById(req.user._id);
    user.gmailToken = tokens;
    await user.save();
    res.redirect('http://localhost:3000/dashboard');
  } catch(err){
    console.error(err);
    res.status(500).json({ message:'Failed to connect Gmail' });
  }
};
