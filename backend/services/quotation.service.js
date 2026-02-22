import Quotation from '../models/quotation.model.js';
import Tour from '../models/tour.model.js';
import ApiError from '../utils/ApiError.js';

export const calculateQuotationCost = (tourPrice, adults, children) => {
  const adultCost = adults * tourPrice;
  const childCost = children * (tourPrice * 0.5);

  const baseAmount = adultCost + childCost;
  const tax = baseAmount * 0.05;
  const discount = baseAmount > 50000 ? 2000 : 0;

  return {
    baseAmount,
    tax,
    discount,
    totalAmount: baseAmount + tax - discount
  };
};

export const createQuotation = async (userId, payload) => {
  const tour = await Tour.findById(payload.tour);
  if (!tour) throw new ApiError(404, 'Tour not found');

  const cost = calculateQuotationCost(
    tour.pricePerPerson,
    payload.adults,
    payload.children
  );

  const quotation = await Quotation.create({
    ...payload,
    ...cost,
    user: userId,
    quotationNumber: `QT-${Date.now()}`
  });

  return quotation;
};

export const getUserQuotations = async (userId) => {
  return await Quotation.find({ user: userId }).populate('tour');
};