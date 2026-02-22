import express from 'express';
import {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tour.controller.js';

const router = express.Router();

router.get('/', getAllTours);
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router;