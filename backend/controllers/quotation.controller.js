import Quotation from '../models/quotation.model.js';

export const getAllQuotations = async (req, res) => {
  const quotations = await Quotation.find().sort({ createdAt: -1 });
  res.json(quotations);
};

export const createQuotation = async (req, res) => {
  const quotation = await Quotation.create(req.body);
  res.status(201).json(quotation);
};

export const updateQuotation = async (req, res) => {
  const quotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(quotation);
};

export const deleteQuotation = async (req, res) => {
  await Quotation.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};