import React, { useEffect, useState } from 'react';
import { Mail, Shield, Calendar, Trash2, AlertTriangle, X } from 'lucide-react';
import { apiRequest } from '../../src/services/api';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */
 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await apiRequest('/users', 'GET');
      console.log('USERS RESPONSE:', res);

      setUsers(Array.isArray(res) ? res : []);
    } catch (err) {
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  /* ================= DELETE USER ================= */
  const deleteUser = async () => {
    try {
      await apiRequest(`/users/${userToDelete._id}`, 'DELETE');
      setUsers(prev => prev.filter(u => u._id !== userToDelete._id));
      setUserToDelete(null);
    } catch {
      alert('Delete failed');
    }
  };

  if (loading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                {/* NAME */}
                <td className="px-6 py-5 font-bold text-gray-900">
                  {u.name}
                </td>

                {/* EMAIL */}
                <td className="px-6 py-5 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    {u.email}
                  </div>
                </td>

                {/* ROLE */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      u.role === 'Admin'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Shield size={12} className="inline mr-1" />
                    {u.role}
                  </span>
                </td>

                {/* JOINED */}
                <td className="px-6 py-5 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => setUserToDelete(u)}
                    className="p-2 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="text-red-600" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-red-50 p-3 rounded-2xl">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <button onClick={() => setUserToDelete(null)}>
                <X />
              </button>
            </div>

            <h3 className="text-xl font-bold mb-2">
              Delete user?
            </h3>
            <p className="text-gray-600 mb-8">
              Are you sure you want to remove{' '}
              <span className="font-bold">{userToDelete.name}</span>?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 border py-3 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;