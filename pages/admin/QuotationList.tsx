import React, { useState } from 'react';
import { quotations } from '../../data/mockData';
import { FileText, MoreVertical, CheckCircle, Clock, AlertCircle, Eye, Edit, Trash2, X, Save } from 'lucide-react';

const QuotationList: React.FC = () => {
  const [quotationsList, setQuotationsList] = useState(quotations);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const openViewModal = (quotation: any) => {
    setSelectedQuotation(quotation);
    setIsViewModalOpen(true);
    setDropdownOpen(null);
  };

  const openEditModal = (quotation: any) => {
    setSelectedQuotation(quotation);
    setIsEditModalOpen(true);
    setDropdownOpen(null);
  };

  const openDeleteModal = (quotation: any) => {
    setSelectedQuotation(quotation);
    setIsDeleteModalOpen(true);
    setDropdownOpen(null);
  };

  const handleDelete = () => {
    if (selectedQuotation) {
      setQuotationsList(quotationsList.filter(q => q.id !== selectedQuotation.id));
      setIsDeleteModalOpen(false);
      setSelectedQuotation(null);
    }
  };

  const handleEdit = () => {
    if (selectedQuotation) {
      setQuotationsList(quotationsList.map(q => q.id === selectedQuotation.id ? selectedQuotation : q));
      setIsEditModalOpen(false);
      setSelectedQuotation(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quotationsList.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-mono text-xs text-gray-500 font-bold">#{q.id}</td>
                <td className="px-6 py-5">
                  <div>
                    <p className="font-bold text-gray-900">{q.customerName}</p>
                    <p className="text-xs text-gray-500">Travel Date: {q.travelDate}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">{q.destination}</p>
                    <p className="text-xs text-gray-500">{q.people} Pax • Budget: {q.budget}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    q.status === 'Pending'
                      ? 'bg-amber-50 text-amber-600 border border-amber-100'
                      : q.status === 'Processed'
                      ? 'bg-green-50 text-green-600 border border-green-100'
                      : 'bg-gray-50 text-gray-600 border border-gray-100'
                  }`}>
                    {q.status === 'Pending' ? <Clock size={12} className="mr-1.5" /> : <CheckCircle size={12} className="mr-1.5" />}
                    {q.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => toggleDropdown(q.id)}
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {dropdownOpen === q.id && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="none">
                          <button
                            onClick={() => openViewModal(q)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <Eye size={16} className="mr-2" /> View
                          </button>
                          <button
                            onClick={() => openEditModal(q)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <Edit size={16} className="mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(q)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            role="menuitem"
                          >
                            <Trash2 size={16} className="mr-2" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 px-4">
        <div className="flex items-center text-xs text-gray-500">
          <Clock size={14} className="text-amber-500 mr-1.5" /> Awaiting response
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <CheckCircle size={14} className="text-green-500 mr-1.5" /> Quotation sent
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <AlertCircle size={14} className="text-red-500 mr-1.5" /> Urgency flagged
        </div>
      </div>

      {/* View Quotation Modal */}
      {isViewModalOpen && selectedQuotation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Quotation Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-bold text-gray-900">{selectedQuotation.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-bold text-gray-900">{selectedQuotation.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Travel Date</p>
                <p className="font-bold text-gray-900">{selectedQuotation.travelDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">People</p>
                <p className="font-bold text-gray-900">{selectedQuotation.people} Pax</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-bold text-gray-900">{selectedQuotation.budget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-bold text-gray-900">{selectedQuotation.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Quotation Modal */}
      {isEditModalOpen && selectedQuotation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Quotation</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <input
                  type="text"
                  value={selectedQuotation.customerName}
                  onChange={(e) => setSelectedQuotation({ ...selectedQuotation, customerName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  value={selectedQuotation.destination}
                  onChange={(e) => setSelectedQuotation({ ...selectedQuotation, destination: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                <input
                  type="text"
                  value={selectedQuotation.travelDate}
                  onChange={(e) => setSelectedQuotation({ ...selectedQuotation, travelDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">People</label>
                <input
                  type="text"
                  value={selectedQuotation.people}
                  onChange={(e) => setSelectedQuotation({ ...selectedQuotation, people: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <input
                  type="text"
                  value={selectedQuotation.budget}
                  onChange={(e) => setSelectedQuotation({ ...selectedQuotation, budget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedQuotation.status}
                  onChange={(e) => setSelectedQuotation({ ...selectedQuotation, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processed">Processed</option>
                </select>
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedQuotation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-red-50 p-3 rounded-2xl">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Quotation?</h3>
            <p className="text-gray-600 mb-8">
              Are you sure you want to delete the quotation for <span className="font-bold">{selectedQuotation.customerName}</span>? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
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

export default QuotationList;
