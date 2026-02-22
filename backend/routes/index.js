import express from 'express';
import authRoutes from './auth.routes.js';
import tourRoutes from './tour.routes.js';
import quotationRoutes from './quotation.routes.js';
import userRoutes from './user.routes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tours', tourRoutes);
router.use('/quotations', quotationRoutes);
router.use('/users', userRoutes);

export default router;