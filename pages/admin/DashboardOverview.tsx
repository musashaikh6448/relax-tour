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
    recentQuotations: [], // 👈 default array
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await apiRequest('/dashboard', 'GET');
      console.log('DASHBOARD RESPONSE:', res);

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
          <h3 className="font-bold text-lg mb-4">Recent Quotation Requests</h3>

          <div className="space-y-4">
            {Array.isArray(stats.recentQuotations) &&
              stats.recentQuotations.map((q: any) => (
                <div
                  key={q._id}
                  className="flex justify-between bg-gray-50 p-4 rounded-2xl"
                >
                  <p className="font-bold">{q.destination}</p>
                  <span className="text-sm">{q.status}</span>
                </div>
              ))}
          </div>
        </div>

        {/* POPULAR TOURS */}
        <div className="bg-white rounded-3xl p-6">
          <h3 className="font-bold text-lg mb-4">Popular Tours</h3>

          {Array.isArray(stats.recentQuotations) &&
            stats.recentQuotations.slice(0, 3).map((q: any) => (
              <div key={q._id} className="mb-2">
                {q.destination}
              </div>
            ))}
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