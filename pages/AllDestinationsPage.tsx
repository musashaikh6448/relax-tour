import React, { useEffect, useState } from 'react';
import TourCard from '../components/TourCard';
import { apiRequest } from '../src/services/api';

const AllDestinationsPage: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await apiRequest('/tours', 'GET');

        // backend directly array bhej raha hai
        setTours(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error(error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-4">
        All Tour Packages
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Explore all destinations added by Relax Tours admin
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="col-span-full text-center">Loading tours...</p>
        ) : tours.length > 0 ? (
          tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))
        ) : (
          <p className="col-span-full text-center">
            No tours available
          </p>
        )}
      </div>
    </div>
  );
};

export default AllDestinationsPage;