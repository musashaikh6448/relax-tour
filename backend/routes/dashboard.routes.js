import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getDashboardStats);

export default router;