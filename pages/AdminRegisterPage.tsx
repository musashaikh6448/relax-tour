import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { apiRequest } from '../src/services/api';

const AdminRegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await apiRequest('/auth/register', 'POST', {
      name,
      email,
      password,
      role: 'customer',
    });

    // ✅ AUTO LOGIN
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    // ✅ DIRECT WEBSITE OPEN
    navigate('/');
  } catch (err: any) {
    alert(err.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-orange-600 p-3 rounded-2xl shadow-xl shadow-orange-600/20">
            <Plane className="h-10 w-10 text-white" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Register to start your journey with Relax Tours
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 px-3 py-3 border rounded-xl"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 px-3 py-3 border rounded-xl"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border rounded-xl"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <span
              className="text-orange-600 cursor-pointer font-semibold"
              onClick={() => navigate('/admin/login')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;