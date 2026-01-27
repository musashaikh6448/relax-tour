
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import TourDetailsPage from './pages/TourDetailsPage';

import AdminLoginPage from './pages/AdminLoginPage';

// Admin Pages
import DashboardOverview from './pages/admin/DashboardOverview';
import TourManagement from './pages/admin/TourManagement';
import QuotationList from './pages/admin/QuotationList';
import CreateQuotation from './pages/admin/CreateQuotation';
import UsersPage from './pages/admin/UsersPage';
import DomesticToursPage from './pages/DomesticToursPage';
import InternationalToursPage from './pages/InternationalToursPage';
import PopularDestinationsPage from './pages/PopularDestinationsPage';
import AllDestinationsPage from './pages/AllDestinationsPage';
import AboutUsPage from './pages/AboutUsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tour/:id" element={<TourDetailsPage />} />
          {/* Add more public pages as needed */}
          <Route path="destinations" element={<AllDestinationsPage />} />
          <Route path="domestic" element={<DomesticToursPage />} />
          <Route path="international" element={<InternationalToursPage />} />
          <Route path="popular-destinations" element={<PopularDestinationsPage />} />
          <Route path="about" element={<AboutUsPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="tours" element={<TourManagement />} />
          <Route path="quotations" element={<QuotationList />} />
          <Route path="quotations/new" element={<CreateQuotation />} />
          <Route path="users" element={<UsersPage />} />

        </Route>

        {/* 404 Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
