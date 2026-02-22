import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

/* ================= GET ALL USERS ================= */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json(users);
  } catch (error) {
    next(new ApiError(500, 'Failed to fetch users'));
  }
};

/* ================= DELETE USER ================= */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    await user.deleteOne();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(new ApiError(500, 'Failed to delete user'));
  }
};