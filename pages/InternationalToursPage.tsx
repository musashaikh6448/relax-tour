import React from 'react';
import { tours } from '../data/mockData';
import TourCard from '../components/TourCard';
import { ChevronRight } from 'lucide-react';

const InternationalToursPage: React.FC = () => {
  const internationalTours = tours.filter(
    tour => tour.category === 'International'
  );

  return (
    <div>
      {/* Header Section */}
      <section className="relative h-[55vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover"
          alt="International Tours"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Travel <span className="text-orange-500">Worldwide</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Luxury international holidays crafted for unforgettable global journeys.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-3">
                International Packages
              </p>
              <h2 className="text-4xl font-bold text-gray-900">
                World’s Best Destinations
              </h2>
            </div>

            <span className="flex items-center text-orange-600 font-bold">
              Premium Experiences <ChevronRight className="ml-1" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternationalToursPage;
