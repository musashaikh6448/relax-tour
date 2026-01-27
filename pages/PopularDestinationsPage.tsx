import React from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  { id: 1, name: 'Kashmir', image: 'https://images.unsplash.com/photo-1581888227599-779811939961' },
  { id: 2, name: 'Goa', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
  { id: 3, name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944' },
  { id: 4, name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41' },
];

const PopularDestinationsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">
        Popular Destinations
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Hand-picked destinations loved by our travelers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map(dest => (
          <div
            key={dest.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{dest.name}</h3>
              <Link
                to={`/tour/${dest.id}`}
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
