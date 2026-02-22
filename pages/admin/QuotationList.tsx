import React, { useEffect, useState } from 'react';
import {
  Clock,
  CheckCircle,
  MoreVertical,
  Eye,
  Trash2,
  FileText,
} from 'lucide-react';
import { apiRequest } from '../../src/services/api';

const QuotationList: React.FC = () => {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchQuotations = async () => {
    const data = await apiRequest('/quotations', 'GET');
    setQuotations(data);
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const markProcessed = async (id: string) => {
    await apiRequest(`/quotations/${id}`, 'PUT', { status: 'Processed' });
    setOpenMenuId(null);
    fetchQuotations();
  };

  const deleteQuotation = async (id: string) => {
    if (!window.confirm('Delete this quotation?')) return;
    await apiRequest(`/quotations/${id}`, 'DELETE');
    setOpenMenuId(null);
    fetchQuotations();
  };

  const generatePdf = async (id: string) => {
    const res = await apiRequest(`/quotations/${id}/pdf`, 'GET');
    window.open(res.pdfUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Destination</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {quotations.map((q) => (
            <tr key={q._id} className="border-t">
              <td className="px-6 py-4 font-mono">
                #{q._id.slice(-5)}
              </td>

              <td className="px-6 py-4">
                <p className="font-bold">{q.customerName}</p>
                <p className="text-xs text-gray-500">{q.travelDate}</p>
              </td>

              <td className="px-6 py-4 font-medium">
                {q.destination}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    q.status === 'Pending'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {q.status === 'Pending' ? (
                    <Clock size={12} />
                  ) : (
                    <CheckCircle size={12} />
                  )}
                  {q.status}
                </span>
              </td>

              <td className="px-6 py-4 text-right relative">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === q._id ? null : q._id)
                  }
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <MoreVertical />
                </button>

                {openMenuId === q._id && (
                  <div className="absolute right-0 top-10 bg-white border rounded-xl shadow-xl w-52 z-[9999]">
                    
                    {/* VIEW */}
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                      onClick={() =>
                        alert(
                          `Customer: ${q.customerName}
Destination: ${q.destination}
People: ${q.people}
Budget: ${q.budget}
Notes: ${q.notes || '-'}`
                        )
                      }
                    >
                      <Eye size={16} /> View
                    </button>

                    {/* ✅ GENERATE PDF */}
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                      onClick={() => generatePdf(q._id)}
                    >
                      <FileText size={16} /> Generate PDF
                    </button>

                    {/* MARK PROCESSED */}
                    {q.status === 'Pending' && (
                      <button
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                        onClick={() => markProcessed(q._id)}
                      >
                        <CheckCircle size={16} /> Mark Processed
                      </button>
                    )}

                    {/* DELETE */}
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                      onClick={() => deleteQuotation(q._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationList;