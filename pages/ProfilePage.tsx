import React from 'react';
import { User, Mail, Shield } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-6">
            {/* AVATAR */}
            <div className="h-20 w-20 rounded-full bg-orange-600 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* BASIC INFO */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* DETAILS CARD */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Account Information
          </h3>

          <div className="space-y-5">
            {/* NAME */}
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <User className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-800">
                  {user.name}
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Mail className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>

            {/* ROLE */}
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Shield className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Role</p>
                <span className="inline-block mt-1 px-4 py-1 text-sm font-semibold rounded-full bg-orange-600 text-white capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-6 text-center text-sm text-gray-500">
          This information is used to personalize your experience on Relax Tours.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;