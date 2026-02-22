import React, { useEffect, useState } from 'react';
import { Map, Users, FileText, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../src/services/api';

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalTours: 0,
    registeredUsers: 0,
    activeQuotations: 0,
    revenue: 0,
    recentQuotations: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await apiRequest('/dashboard', 'GET');

      setStats({
        totalTours: res.totalTours ?? 0,
        registeredUsers: res.registeredUsers ?? 0,
        activeQuotations: res.activeQuotations ?? 0,
        revenue: res.revenue ?? 0,
        recentQuotations: Array.isArray(res.recentQuotations)
          ? res.recentQuotations
          : [],
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* TOP STATS */}
      <div className="grid grid-cols-4 gap-6">
        <Stat title="Total Tours" value={stats.totalTours} icon={Map} />
        <Stat title="Registered Users" value={stats.registeredUsers} icon={Users} />
        <Stat title="Active Quotations" value={stats.activeQuotations} icon={FileText} />
        <Stat
          title="Monthly Revenue"
          value={`₹${(stats.revenue / 100000).toFixed(1)}L`}
          icon={DollarSign}
        />
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-2 gap-6">
        {/* RECENT QUOTATIONS */}
        <div className="bg-white rounded-3xl p-6">
       <div className="flex items-center justify-between mb-4">
  <h3 className="font-bold text-lg">Recent Quotation Requests</h3>

  <Link
    to="/admin/quotations"
    className="text-orange-600 text-sm font-semibold hover:underline"
  >
    View All
  </Link>
</div>

          <div className="space-y-4">
            {stats.recentQuotations.map((q: any) => (
              <div
                key={q._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {q.destination?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {q.name || 'Guest User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Destination: {q.destination}
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    q.status === 'Pending'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR TOURS */}
        <div className="bg-white rounded-3xl p-6">
          <h3 className="font-bold text-lg mb-4">Popular Tours</h3>

          <div className="space-y-4">
            {stats.recentQuotations.slice(0, 3).map((q: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80"
                    alt="tour"
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {q.destination} Package
                    </p>
                    <p className="text-xs text-gray-500">
                      5 Days / 4 Nights · ₹25,000
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-orange-600 font-bold text-sm">84 sales</p>
                  <p className="text-[10px] text-gray-400 uppercase">
                    this month
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ title, value, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-3xl">
    <Icon className="text-orange-600 mb-3" />
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

export default DashboardOverview;