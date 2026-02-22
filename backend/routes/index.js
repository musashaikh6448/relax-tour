import express from 'express';
import authRoutes from './auth.routes.js';
import tourRoutes from './tour.routes.js';
import quotationRoutes from './quotation.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tours', tourRoutes);
router.use('/quotations', quotationRoutes);

export default router;