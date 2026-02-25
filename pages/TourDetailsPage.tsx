import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, CreditCard, X } from 'lucide-react';
import { apiRequest } from '../src/services/api';

const TourDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customerName: '',
    travelDate: '',
    people: 2,
    notes: '',
  });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await apiRequest(`/tours/${id}`, 'GET');
        setTour(res);
      } catch {
        setTour(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading tour...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Tour not found
      </div>
    );
  }

  const imageUrl =
    tour.image && tour.image.trim()
      ? tour.image
      : 'https://via.placeholder.com/1600x600?text=Relax+Tours';

  const submitQuotation = async () => {
    try {
      setSubmitting(true);

      await apiRequest('/quotations', 'POST', {
        customerName: form.customerName,
        destination: tour.name,
        travelDate: form.travelDate,
        people: form.people,
        budget: tour.price,
        notes: form.notes,
      });

      alert('Quotation request sent successfully');
      setOpenModal(false);
      setForm({
        customerName: '',
        travelDate: '',
        people: 2,
        notes: '',
      });
    } catch {
      alert('Failed to send quotation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <div
        className="h-[420px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto h-full flex items-end pb-10 px-6">
          <div>
            <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              {tour.category}
            </span>
            <h1 className="text-4xl font-extrabold text-white mt-3">
              {tour.name}
            </h1>
            <p className="text-white/90 mt-2">
              {tour.location} • {tour.duration}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          {/* OVERVIEW */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600">{tour.overview}</p>
          </div>

          {/* DAY WISE ITINERARY */}
          <div className="bg-white rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold">Day-wise Itinerary</h2>

            {tour.itinerary.map((day: any) => (
              <div key={day.day} className="flex gap-4">
                <div className="h-9 w-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  {day.day}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    {day.title}
                  </h4>
                  <ul className="list-disc ml-5 text-sm text-gray-600 mt-1">
                    {day.points.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* INCLUDED / EXCLUDED */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-4">What's Included</h3>
              <ul className="space-y-2 text-sm">
                {tour.included.map((item: string, i: number) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-4">What's Excluded</h3>
              <ul className="space-y-2 text-sm">
                {tour.excluded.map((item: string, i: number) => (
                  <li key={i}>✕ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl p-8 h-fit sticky top-28">
          <p className="text-gray-500 mb-1">Total Package Price</p>
          <p className="text-4xl font-extrabold text-gray-900">
            ₹{tour.price.toLocaleString()}
            <span className="text-sm font-medium text-gray-500"> / person</span>
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="text-green-600" size={18} />
              100% Secure Payments
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="text-blue-600" size={18} />
              Easy EMI Available
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <button
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold"
              onClick={() => setOpenModal(true)}
            >
              Request Free Quotation
            </button>

            <button
              className="w-full border py-3 rounded-xl font-bold"
              onClick={() =>
                window.open(
                  tour.brochureUrl ||
                    'https://example.com/sample-brochure.pdf',
                  '_blank'
                )
              }
            >
              Download Brochure
            </button>

            <p className="text-xs text-gray-400 text-center">
              * Taxes & flight charges extra as per availability
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpenModal(false)}
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Request Free Quotation
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Your Name"
                className="w-full border px-4 py-3 rounded-xl"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border px-4 py-3 rounded-xl"
                value={form.travelDate}
                onChange={(e) =>
                  setForm({ ...form, travelDate: e.target.value })
                }
              />

              <input
                type="number"
                min={1}
                className="w-full border px-4 py-3 rounded-xl"
                value={form.people}
                onChange={(e) =>
                  setForm({ ...form, people: +e.target.value })
                }
              />

              <textarea
                placeholder="Notes (optional)"
                rows={3}
                className="w-full border px-4 py-3 rounded-xl"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
              />

              <button
                disabled={submitting}
                onClick={submitQuotation}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetailsPage;