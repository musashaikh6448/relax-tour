import Tour from '../models/tour.model.js';
import User from '../models/user.model.js';
import Quotation from '../models/quotation.model.js';

export const getDashboardStats = async (req, res) => {
  const totalTours = await Tour.countDocuments();
  const registeredUsers = await User.countDocuments();
  const activeQuotations = await Quotation.countDocuments({ status: 'Pending' });

  res.json({
    success: true,
    data: {
      totalTours,
      registeredUsers,
      activeQuotations,
      revenue: '₹14.2L', // abhi mock
    },
  });
};