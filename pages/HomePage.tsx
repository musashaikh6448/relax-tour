import React, { useEffect, useState } from 'react';
import TourCard from '../components/TourCard';
import { Search, ChevronRight } from 'lucide-react';
import { apiRequest } from '../src/services/api';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await apiRequest('/tours', 'GET');
        const data = Array.isArray(res) ? res : [];
        setTours(data);
        setFilteredTours(data); // 🔥 IMPORTANT
      } catch (error) {
        console.error('Error fetching tours:', error);
        setTours([]);
        setFilteredTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  /* ================= REAL SEARCH LOGIC ================= */
  useEffect(() => {
    if (!search.trim()) {
      setFilteredTours(tours);
      return;
    }

    const q = search.toLowerCase();

    const result = tours.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        t.location?.toLowerCase().includes(q)
    );

    setFilteredTours(result);
  }, [search, tours]);

  return (
    <div>
      {/* ================= HERO SECTION (UNCHANGED) ================= */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bbfd?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover <span className="text-orange-500">New Horizons</span> with Every Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
              Experience hand-crafted tours that blend luxury, culture, and adventure.
              From the peaks of Kashmir to the beaches of Bali.
            </p>

            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl max-w-xl">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <div className="flex-grow bg-white rounded-xl flex items-center px-4 py-3">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                     value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-gray-800 bg-transparent focus:outline-none placeholder-gray-400"
                  />
                </div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED DESTINATIONS (UNCHANGED UI) ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div>
              <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-3">
                Top Experiences
              </p>
              <h2 className="text-4xl font-bold text-gray-900">
                Featured Destinations
              </h2>
            </div>

            <button
  onClick={() => navigate('/destinations')}
  className="flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors group"
>
  View All Packages
  <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-full text-center py-10">
                Loading tours...
              </p>
            ) : filteredTours.length > 0 ? (
  filteredTours.map((tour) => (
    <TourCard key={tour._id} tour={tour} />
  ))
) : (
              <p className="col-span-full text-center py-10">
                No tours available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (UNCHANGED) ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600"
                className="rounded-3xl h-64 w-full object-cover shadow-lg"
                alt="Feature 1"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Xhq05mvStJ3UgYDFKW8QXuGMgSLUNPGLNw&s"
                className="rounded-3xl h-64 w-full object-cover shadow-lg mt-8"
                alt="Feature 2"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDIFcioUddxPR0DAlUSu_-I6chVJzzcAEPVQ&s"
                className="rounded-3xl h-64 w-full object-cover shadow-lg -mt-8"
                alt="Feature 3"
              />
              <img
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600"
                className="rounded-3xl h-64 w-full object-cover shadow-lg"
                alt="Feature 4"
              />
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">
                  Why relax-tours?
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Unforgettable Experiences Guaranteed
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We don't just sell tours; we create memories.
                  Our local experts curate every itinerary for premium experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Curated Experiences', desc: 'Hand-picked hotels and guides.' },
                  { title: 'Local Expertise', desc: 'Guides with deep cultural roots.' },
                  { title: '24/7 Support', desc: 'We are always here for you.' },
                  { title: 'Best Price', desc: 'Luxury travel within your reach.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;