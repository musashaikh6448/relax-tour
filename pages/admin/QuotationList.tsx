import React, { useEffect, useState, useRef } from 'react';
import {
  Clock,
  CheckCircle,
  MoreVertical,
  Eye,
  Trash2,
  FileText,
  Send,
} from 'lucide-react';
import { apiRequest } from '../../src/services/api';

const QuotationList: React.FC = () => {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // outside click ke liye
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* ================= FETCH ================= */
  const fetchQuotations = async () => {
    const data = await apiRequest('/quotations', 'GET');
    setQuotations(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  /* ===== outside click -> menu close ===== */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* ================= ACTIONS ================= */
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

  // ✅ PDF generate + state me pdfUrl save
  const generatePdf = async (id: string) => {
    const res = await apiRequest(`/quotations/${id}/pdf`, 'GET');

    const BACKEND_URL = 'http://localhost:5000';

    // pdfUrl local state me store
    setQuotations((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, pdfUrl: res.pdfUrl } : q
      )
    );

    window.open(`${BACKEND_URL}${res.pdfUrl}`, '_blank');
  };

  const shareOnWhatsapp = (pdfUrl?: string) => {
  if (!pdfUrl) {
    alert('Please generate PDF first');
    return;
  }

  const BACKEND_URL = 'http://localhost:5000';
  const phoneNumber = '91XXXXXXXXXX'; // customer number

  const message = `Hello 👋
Please find your tour quotation PDF below:
${BACKEND_URL}${pdfUrl}

(Click the link to view/download the PDF)`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // ✅ ye hi max reliable method hai
  window.location.href = whatsappUrl;
};

  return (
    <div className="bg-white rounded-3xl border overflow-visible">
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
            <tr key={q._id} className="border-t hover:bg-gray-50">
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
                  <div
                    ref={menuRef}
                    className="absolute right-4 top-12 bg-white border rounded-xl shadow-xl w-56 z-50"
                  >
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                      onClick={() =>
                        alert(
                          `Customer: ${q.customerName}
Destination: ${q.destination}
People: ${q.people}
Budget: ${q.budget || '-'}
Notes: ${q.notes || '-'}`
                        )
                      }
                    >
                      <Eye size={16} /> View Details
                    </button>

                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                      onClick={() => generatePdf(q._id)}
                    >
                      <FileText size={16} /> Generate PDF
                    </button>

                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                      onClick={() => shareOnWhatsapp(q.pdfUrl)}
                    >
                      <Send size={16} /> Share on WhatsApp
                    </button>

                    {q.status === 'Pending' && (
                      <button
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left"
                        onClick={() => markProcessed(q._id)}
                      >
                        <CheckCircle size={16} /> Mark Processed
                      </button>
                    )}

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