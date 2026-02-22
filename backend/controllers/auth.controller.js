import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

/* ================= REGISTER (AUTO LOGIN ENABLED) ================= */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, 'User already exists'));
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
    });

    // 🔥 AUTO LOGIN TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};