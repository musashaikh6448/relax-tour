import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

/* ================= AUTH CHECK ================= */
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new ApiError(401, 'Not authorized, token missing');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded; // { id, role, email }
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

/* ================= ADMIN ONLY ================= */
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, 'Admin access only'));
  }
  next();
};