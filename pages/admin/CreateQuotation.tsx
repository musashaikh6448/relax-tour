
import React, { useState } from 'react';
import { Send, User, MapPin, Calendar, Users, DollarSign, StickyNote } from 'lucide-react';

const CreateQuotation: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    destination: '',
    travelDate: '',
    people: 2,
    budget: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Quotation created successfully (Mock)');
    // Reset form
    setFormData({ customerName: '', destination: '', travelDate: '', people: 2, budget: '', notes: '' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="bg-gray-900 px-8 py-6">
          <h2 className="text-xl font-bold text-white">New Booking Inquiry</h2>
          <p className="text-gray-400 text-sm">Fill in the customer requirements to generate a quote.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <User size={16} className="mr-2 text-gray-400" /> Customer Name
              </label>
              <input 
                type="text" 
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                placeholder="e.g. Rahul Kapoor"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <MapPin size={16} className="mr-2 text-gray-400" /> Destination
              </label>
              <select 
                required
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              >
                <option value="">Select Destination</option>
                <option value="Kashmir">Kashmir</option>
                <option value="Dubai">Dubai</option>
                <option value="Bali">Bali</option>
                <option value="Goa">Goa</option>
                <option value="Kerala">Kerala</option>
              </select>
            </div>

            {/* Travel Date */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Calendar size={16} className="mr-2 text-gray-400" /> Travel Date
              </label>
              <input 
                type="date" 
                required
                value={formData.travelDate}
                onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            {/* People */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Users size={16} className="mr-2 text-gray-400" /> Number of People
              </label>
              <input 
                type="number" 
                min="1"
                required
                value={formData.people}
                onChange={(e) => setFormData({...formData, people: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <DollarSign size={16} className="mr-2 text-gray-400" /> Estimated Budget
              </label>
              <input 
                type="text" 
                placeholder="e.g. ₹50,000 - ₹80,000"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <StickyNote size={16} className="mr-2 text-gray-400" /> Additional Notes
              </label>
              <textarea 
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Any special requests or dietary requirements..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
            >
              <Send size={18} />
              <span>Create Quotation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuotation;
