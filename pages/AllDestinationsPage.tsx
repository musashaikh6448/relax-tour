import React from 'react';

const allDestinations = [
  // Domestic
  { name: 'Goa', type: 'Domestic', description: 'Beaches and nightlife' },
  { name: 'Manali', type: 'Domestic', description: 'Snow and adventure sports' },
  { name: 'Kashmir', type: 'Domestic', description: 'Valleys and lakes' },
  { name: 'Jaipur', type: 'Domestic', description: 'Royal heritage and forts' },
  { name: 'Kerala', type: 'Domestic', description: 'Backwaters and greenery' },

  // International
  { name: 'Dubai', type: 'International', description: 'Luxury and desert safari' },
  { name: 'Paris', type: 'International', description: 'City of love' },
  { name: 'Maldives', type: 'International', description: 'Island resorts' },
  { name: 'Singapore', type: 'International', description: 'Modern city life' },
  { name: 'Thailand', type: 'International', description: 'Beaches and nightlife' },
];

const AllDestinationsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Destinations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allDestinations.map((place, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <span
              className={`inline-block mb-2 text-xs font-semibold px-3 py-1 rounded-full ${
                place.type === 'Domestic'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {place.type}
            </span>

            <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
            <p className="text-gray-600 text-sm">{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDestinationsPage;
