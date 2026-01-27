import React, { useState } from 'react';
import { tours as mockTours } from '../../data/mockData';
import { Search, Plus, Filter, Edit, Trash2, Eye, AlertTriangle, X, Save, ChevronDown } from 'lucide-react';
import { Tour } from '../../types';

const TourManagement: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
  const [tourToView, setTourToView] = useState<Tour | null>(null);
  const [tourToEdit, setTourToEdit] = useState<Tour | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Domestic' | 'International'>('All');
  const [newTour, setNewTour] = useState<Omit<Tour, 'id'> & { id?: number }>({
    name: '',
    location: '',
    category: 'Domestic',
    duration: '',
    price: 0,
    image: '',
  });

  const openDeleteModal = (tour: Tour) => {
    setTourToDelete(tour);
    setIsDeleteModalOpen(true);
  };

  const openViewModal = (tour: Tour) => {
    setTourToView(tour);
    setIsViewModalOpen(true);
  };

  const openEditModal = (tour: Tour) => {
    setTourToEdit(tour);
    setIsEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (tourToDelete) {
      setTours(tours.filter(t => t.id !== tourToDelete.id));
      setIsDeleteModalOpen(false);
      setTourToDelete(null);
    }
  };

  const handleEdit = () => {
    if (tourToEdit) {
      setTours(tours.map(t => (t.id === tourToEdit.id ? tourToEdit : t)));
      setIsEditModalOpen(false);
      setTourToEdit(null);
    }
  };

  const handleAdd = () => {
    const id = tours.length > 0 ? Math.max(...tours.map(t => t.id)) + 1 : 1;
    setTours([...tours, { ...newTour, id }]);
    setIsAddModalOpen(false);
    setNewTour({
      name: '',
      location: '',
      category: 'Domestic',
      duration: '',
      price: 0,
      image: '',
    });
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || tour.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tours by name or location..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
              onClick={() => setFilterCategory(prev =>
                prev === 'All' ? 'Domestic' : prev === 'Domestic' ? 'International' : 'All'
              )}
            >
              <Filter size={18} />
              <span>{filterCategory}</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <button
            className="flex items-center space-x-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 font-bold transition-all shadow-lg shadow-orange-600/20"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add New Tour</span>
          </button>
        </div>
      </div>

      {/* Tour Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tour Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTours.map((tour) => (
              <tr key={tour.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-4">
                    <img src={tour.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{tour.name}</p>
                      <p className="text-xs text-gray-500">{tour.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    tour.category === 'Domestic' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {tour.category}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                  {tour.duration}
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-gray-900">₹{tour.price.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openViewModal(tour)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => openEditModal(tour)}
                      className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(tour)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-red-50 p-3 rounded-2xl">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Tour Package?</h3>
            <p className="text-gray-600 mb-8">
              Are you sure you want to delete <span className="font-bold">"{tourToDelete?.name}"</span>? This action cannot be undone and will remove the tour from the public listing.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                Delete Tour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Tour Modal */}
      {isViewModalOpen && tourToView && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Tour Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={tourToView.image} className="w-full h-48 object-cover rounded-xl" alt={tourToView.name} />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-bold text-gray-900">{tourToView.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-bold text-gray-900">{tourToView.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-bold text-gray-900">{tourToView.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-bold text-gray-900">{tourToView.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-bold text-gray-900">₹{tourToView.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tour Modal */}
      {isEditModalOpen && tourToEdit && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Tour</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={tourToEdit.name}
                  onChange={(e) => setTourToEdit({ ...tourToEdit, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={tourToEdit.location}
                  onChange={(e) => setTourToEdit({ ...tourToEdit, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={tourToEdit.category}
                  onChange={(e) => setTourToEdit({ ...tourToEdit, category: e.target.value as 'Domestic' | 'International' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={tourToEdit.duration}
                  onChange={(e) => setTourToEdit({ ...tourToEdit, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={tourToEdit.price}
                  onChange={(e) => setTourToEdit({ ...tourToEdit, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={tourToEdit.image}
                  onChange={(e) => setTourToEdit({ ...tourToEdit, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
              >
                <Save size={18} className="inline mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Tour Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Tour</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newTour.name}
                  onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newTour.location}
                  onChange={(e) => setNewTour({ ...newTour, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTour.category}
                  onChange={(e) => setNewTour({ ...newTour, category: e.target.value as 'Domestic' | 'International' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newTour.duration}
                  onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={newTour.price}
                  onChange={(e) => setNewTour({ ...newTour, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newTour.image}
                  onChange={(e) => setNewTour({ ...newTour, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
              >
                <Save size={18} className="inline mr-2" />
                Add Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourManagement;
