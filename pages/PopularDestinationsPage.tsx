import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../src/services/api';

const PopularDestinationsPage: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/tours').then((res) => {
      setTours(res || []);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">
        Popular Destinations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="rounded-xl overflow-hidden shadow"
          >
            <img
              src={tour.image}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">
                {tour.name}
              </h3>
              <Link
                to={`/tour/${tour._id}`}
                className="inline-block mt-2 text-orange-500 font-medium"
              >
                View Tours →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinationsPage;