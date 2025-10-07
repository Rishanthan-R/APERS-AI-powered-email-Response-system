const User = require('../models/User');

exports.getProfile = async (req, res) => res.json(req.user);

exports.updateProfile = async (req, res) => {
  const { fullName, phone, company, role } = req.body;
  const user = await User.findById(req.user._id);

  if(fullName) user.fullName = fullName;
  if(phone) user.phone = phone;
  if(company) user.company = company;
  if(role) user.role = role;

  await user.save();
  res.json(user);
};
