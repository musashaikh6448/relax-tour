
import React from 'react';
import { tours, users, quotations } from '../../data/mockData';
import { Map, Users, FileText, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    { label: 'Total Tours', value: tours.length, icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Registered Users', value: users.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Quotations', value: quotations.length, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Monthly Revenue', value: '₹14.2L', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good morning, Rahul!</h1>
          <p className="text-gray-500">Here's what's happening with relax-tours today.</p>
        </div>
        <div className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100">
          <Calendar size={18} />
          <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} className="mr-1" /> +12%
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotations */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Recent Quotation Requests</h3>
            <button className="text-orange-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {quotations.map(q => (
              <div key={q.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                    {q.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{q.customerName}</p>
                    <p className="text-xs text-gray-500">Destination: {q.destination} • {q.people} Pax</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  q.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tours */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Popular Tour Packages</h3>
            <button className="text-orange-600 text-sm font-bold hover:underline">Manage Tours</button>
          </div>
          <div className="space-y-6">
            {tours.slice(0, 3).map(tour => (
              <div key={tour.id} className="flex items-center space-x-4">
                <img src={tour.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-grow">
                  <p className="font-bold text-gray-900 line-clamp-1">{tour.name}</p>
                  <p className="text-xs text-gray-500">{tour.duration} • ₹{tour.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-600">84 sales</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">This Month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
