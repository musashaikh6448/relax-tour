import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({
    success: true,
    data: users,
  });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};