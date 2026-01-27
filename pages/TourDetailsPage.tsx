
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { tours } from '../data/mockData';
import { Clock, MapPin, CheckCircle, XCircle, ChevronLeft, CreditCard, ShieldCheck } from 'lucide-react';

const TourDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Tour not found</h2>
        <Link to="/" className="text-orange-600 underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
        <div className="absolute top-8 left-8">
          <Link to="/" className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 rounded-full flex items-center transition-all">
            <ChevronLeft size={24} />
          </Link>
        </div>
        <div className="absolute bottom-12 left-0 right-0">
          <div className="max-w-7xl mx-auto px-8">
            <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              {tour.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{tour.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center"><MapPin className="mr-2 text-orange-400" size={20} /> {tour.location}</span>
              <span className="flex items-center"><Clock className="mr-2 text-orange-400" size={20} /> {tour.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-orange-500 pl-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
              {tour.fullOverview}
            </p>
          </section>

          {/* Itinerary */}
          {tour.itinerary.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-orange-500 pl-4">Day-wise Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((item) => (
                  <div key={item.day} className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold border border-orange-200 z-10">
                      {item.day}
                    </div>
                    {item.day !== tour.itinerary.length && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                    )}
                    <div className="flex-grow pb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                      <ul className="space-y-2">
                        {item.activities.map((act, i) => (
                          <li key={i} className="flex items-center text-gray-600">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
              <h3 className="text-lg font-bold text-green-800 mb-6 flex items-center">
                <CheckCircle className="mr-2" size={20} /> What's Included
              </h3>
              <ul className="space-y-4">
                {tour.inclusions.map((item, idx) => (
                  <li key={idx} className="text-sm text-green-700 flex items-start">
                    <span className="mr-2 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="bg-red-50/50 p-8 rounded-3xl border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-6 flex items-center">
                <XCircle className="mr-2" size={20} /> What's Excluded
              </h3>
              <ul className="space-y-4">
                {tour.exclusions.map((item, idx) => (
                  <li key={idx} className="text-sm text-red-700 flex items-start">
                    <span className="mr-2 mt-1">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Sidebar / Booking */}
        <aside className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100 sticky top-28">
            <div className="mb-8">
              <p className="text-gray-500 text-sm mb-1">Total Package Price</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-black text-gray-900">₹{tour.price.toLocaleString('en-IN')}</span>
                <span className="text-gray-400 ml-2 text-sm">/ person</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <ShieldCheck className="text-green-600 mr-3" size={20} />
                <span className="text-sm font-medium text-gray-700">100% Secure Payments</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <CreditCard className="text-blue-600 mr-3" size={20} />
                <span className="text-sm font-medium text-gray-700">Easy EMI Available</span>
              </div>
            </div>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-4">
              Request Free Quotation
            </button>
            <button className="w-full border-2 border-gray-200 hover:border-gray-900 text-gray-900 font-bold py-4 rounded-2xl transition-all">
              Download Brochure
            </button>

            <p className="text-center text-xs text-gray-400 mt-6 px-4">
              * Taxes & flight charges extra as per availability.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TourDetailsPage;
