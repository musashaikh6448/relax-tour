import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, ChevronLeft } from 'lucide-react';
import { apiRequest } from '../src/services/api';

const TourDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);

  useEffect(() => {
    const fetchTour = async () => {
      const res = await apiRequest(`/tours/${id}`, 'GET');
      setTour(res.data);
    };
    fetchTour();
  }, [id]);

  if (!tour) return <p className="text-center mt-20">Loading tour...</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative h-[60vh]">
        <img src={tour.image} className="w-full h-full object-cover" />
        <Link to="/" className="absolute top-6 left-6 bg-white p-3 rounded-full">
          <ChevronLeft />
        </Link>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-bold">{tour.name}</h1>
          <p className="flex items-center mt-2">
            <MapPin className="mr-2" /> {tour.location}
          </p>
          <p className="flex items-center">
            <Clock className="mr-2" /> {tour.duration}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        <p className="text-gray-700 leading-relaxed">{tour.description}</p>
        <h2 className="text-3xl font-bold mt-8">₹{tour.price.toLocaleString('en-IN')}</h2>
      </div>
    </div>
  );
};

export default TourDetailsPage;