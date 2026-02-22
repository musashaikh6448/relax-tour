import Tour from '../models/tour.model.js';
import User from '../models/user.model.js';
import Quotation from '../models/quotation.model.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalTours = await Tour.countDocuments();

    const registeredUsers = await User.countDocuments();

    const activeQuotations = await Quotation.countDocuments({
      status: 'Pending',
    });

    // REAL revenue (number)
    const revenueAgg = await Quotation.aggregate([
      { $match: { status: 'Completed' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' },
        },
      },
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    const recentQuotations = await Quotation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('destination status');

    // ✅ FRONTEND FRIENDLY RESPONSE
    res.json({
      totalTours,
      registeredUsers,
      activeQuotations,
      revenue,
      recentQuotations,
    });
  } catch (error) {
    res.status(500).json({ message: 'Dashboard stats failed' });
  }
};