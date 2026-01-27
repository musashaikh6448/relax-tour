import React from 'react';
import { tours } from '../data/mockData';
import TourCard from '../components/TourCard';
import { ChevronRight } from 'lucide-react';

const DomesticToursPage: React.FC = () => {
  const domesticTours = tours.filter(tour => tour.category === 'Domestic');

  return (
    <div>
      {/* Header Section */}
      <section className="relative h-[55vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1524492717547-2249978a68a9?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Domestic Tours"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Explore <span className="text-orange-500">India</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Discover the beauty of India with hand-crafted domestic travel experiences.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-3">
                Domestic Packages
              </p>
              <h2 className="text-4xl font-bold text-gray-900">
                Popular Indian Destinations
              </h2>
            </div>

            <span className="flex items-center text-orange-600 font-bold">
              Handpicked Tours <ChevronRight className="ml-1" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domesticTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DomesticToursPage;
