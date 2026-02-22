import React, { useEffect, useState } from 'react';
import TourCard from '../components/TourCard';
import { ChevronRight } from 'lucide-react';
import { apiRequest } from '../src/services/api';

const InternationalToursPage: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await apiRequest('/tours', 'GET');
      setTours(res.data || []);
    };
    fetchTours();
  }, []);

  const internationalTours = tours.filter(
    (tour) => tour.category === 'International'
  );

  return (
    <div>
      <section className="relative h-[55vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Travel <span className="text-orange-500">Worldwide</span>
          </h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between mb-12">
            <h2 className="text-4xl font-bold">International Packages</h2>
            <span className="flex items-center text-orange-600 font-bold">
              Premium Experiences <ChevronRight className="ml-1" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalTours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternationalToursPage;