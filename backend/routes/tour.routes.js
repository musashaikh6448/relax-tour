import express from 'express';
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tour.controller.js';

const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourById); // 🔥 VERY IMPORTANT
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router;