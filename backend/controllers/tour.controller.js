import Tour from '../models/tour.model.js';

export const getAllTours = async (req, res) => {
  const tours = await Tour.find().sort({ createdAt: -1 });
  res.json(tours);
};

export const createTour = async (req, res) => {
  const tour = await Tour.create(req.body);
  res.status(201).json(tour);
};

export const updateTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(tour);
};

export const deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tour deleted' });
};