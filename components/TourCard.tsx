import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  /* ================= SAFE FALLBACKS ================= */

  const durationText =
    typeof tour.duration === 'string' && tour.duration.trim()
      ? tour.duration
      : 'Duration not available';

  const locationText =
    typeof tour.location === 'string' && tour.location.trim()
      ? tour.location.split(',')[0]
      : 'Location not available';

  const imageUrl =
    typeof tour.image === 'string' && tour.image.trim()
      ? tour.image
      : 'https://via.placeholder.com/600x400?text=Relax+Tours';

  const descriptionText =
    typeof tour.description === 'string' && tour.description.trim()
      ? tour.description
      : 'Explore this beautiful destination with Relax Tours.';

  const priceValue =
    typeof tour.price === 'number' && !isNaN(tour.price)
      ? tour.price
      : 0;

  /* ================================================== */

  return (
    <Link
      to={`/tour/${tour._id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden h-64">
        <img
          src={imageUrl}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-sm text-[10px] font-bold px-3 py-1.5 rounded-full text-orange-600 uppercase tracking-widest shadow-sm">
            {tour.category || 'Tour'}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center text-white text-[11px] font-semibold space-x-3 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full w-fit">
            <span className="flex items-center">
              <Clock size={14} className="mr-1.5 text-orange-400" />
              {durationText}
            </span>
            <span className="flex items-center border-l border-white/30 pl-3">
              <MapPin size={14} className="mr-1.5 text-orange-400" />
              {locationText}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {tour.name}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed">
          {descriptionText}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">
              Starting from
            </p>
            <p className="text-2xl font-black text-gray-900">
              ₹{priceValue.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex items-center justify-center bg-gray-50 text-gray-900 p-3.5 rounded-2xl transition-all group-hover:bg-orange-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-600/30">
            <ArrowRight size={22} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;