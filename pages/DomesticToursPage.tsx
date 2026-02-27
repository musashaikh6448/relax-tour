import React, { useEffect, useState } from 'react';
import TourCard from '../components/TourCard';
import { ChevronRight } from 'lucide-react';
import { apiRequest } from '../src/services/api';

const DomesticToursPage: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const data = await apiRequest('/tours', 'GET');

      // ✅ apiRequest direct array deta hai
      setTours(Array.isArray(data) ? data : []);
    };

    fetchTours();
  }, []);

  // ✅ CASE-INSENSITIVE FILTER (REAL FIX)
  const domesticTours = tours.filter(
    (tour) =>
      typeof tour.category === 'string' &&
      tour.category.toLowerCase() === 'domestic'
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[55vh] flex items-center justify-center">
        <img
          src="https://indiator.com/tourist-places/wp-content/uploads/2019/01/When-Where-to-Go-in-India-2019.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Explore <span className="text-orange-500">India</span>
          </h1>
        </div>
      </section>

      {/* TOURS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between mb-12">
            <h2 className="text-4xl font-bold">Domestic Packages</h2>
            <span className="flex items-center text-orange-600 font-bold">
              Handpicked Tours <ChevronRight className="ml-1" />
            </span>
          </div>

          {domesticTours.length === 0 ? (
            <p className="text-center text-gray-500">
              No domestic tours available
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domesticTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DomesticToursPage;