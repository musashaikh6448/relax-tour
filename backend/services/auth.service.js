import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const registerUser = async (data) => {
  const userExists = await User.findOne({ email: data.email });
  if (userExists) throw new ApiError(400, 'User already exists');

  const user = await User.create(data);
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1d' }
  );

  return { user, token };
};