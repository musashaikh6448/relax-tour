import React, { useState } from 'react';
import { Send, User, MapPin, Calendar, Users, DollarSign, StickyNote } from 'lucide-react';
import { apiRequest } from '../../src/services/api';

const CreateQuotation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    destination: '',
    travelDate: '',
    people: 2,
    budget: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiRequest('/quotations', 'POST', formData);
      alert('Quotation created successfully');
      setFormData({
        customerName: '',
        destination: '',
        travelDate: '',
        people: 2,
        budget: '',
        notes: ''
      });
    } catch (err: any) {
      alert(err.message || 'Failed to create quotation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl border shadow-xl overflow-hidden">
        <div className="bg-gray-900 px-8 py-6">
          <h2 className="text-xl font-bold text-white">New Booking Inquiry</h2>
          <p className="text-gray-400 text-sm">Generate quotation for customer</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input required placeholder="Customer Name" value={formData.customerName}
            onChange={e => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl" />

          <select required value={formData.destination}
            onChange={e => setFormData({ ...formData, destination: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl">
            <option value="">Select Destination</option>
            <option>Kashmir</option>
            <option>Dubai</option>
            <option>Bali</option>
            <option>Goa</option>
          </select>

          <input type="date" required value={formData.travelDate}
            onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl" />

          <input type="number" min={1} value={formData.people}
            onChange={e => setFormData({ ...formData, people: +e.target.value })}
            className="w-full px-4 py-3 border rounded-xl" />

          <input placeholder="Budget" value={formData.budget}
            onChange={e => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl" />

          <textarea rows={3} placeholder="Notes"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl" />

          <button disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold">
            {loading ? 'Creating...' : 'Create Quotation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuotation;