
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, FileText, Users, PlusCircle, LogOut, Plane } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: Map, label: 'Tours', path: '/admin/tours' },
    { icon: FileText, label: 'Quotations', path: '/admin/quotations' },
    { icon: PlusCircle, label: 'Create Quotation', path: '/admin/quotations/new' },
    { icon: Users, label: 'Users', path: '/admin/users' },
  ];

  const handleLogout = () => {
    // Navigate to home route as requested
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="text-orange-500" />
            <span className="text-xl font-bold tracking-tight">Admin<span className="text-orange-500">Panel</span></span>
          </Link>
        </div>

        <nav className="flex-grow py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors rounded-xl"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Rahul Khanna</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Super Admin</p>
            </div>
            <img 
              src="https://picsum.photos/seed/admin/100" 
              alt="Admin" 
              className="w-10 h-10 rounded-full border-2 border-orange-500"
            />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
