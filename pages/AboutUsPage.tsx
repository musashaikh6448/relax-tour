import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-orange-500">Relax Tours</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Creating unforgettable travel experiences with comfort, trust,
            and luxury since 1998.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Relax Tours is a premium travel company based in India, offering
              carefully curated domestic and international tour packages.
              We focus on comfort, safety, and personalized travel planning.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From peaceful hill stations to luxury international destinations,
              our mission is to make every journey smooth, memorable, and stress-free.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
              alt="Travel"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Relax Tours?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Expert Planning', desc: 'Hand-crafted itineraries by travel experts.' },
              { title: 'Affordable Luxury', desc: 'Best prices without compromising quality.' },
              { title: '24/7 Support', desc: 'Dedicated customer assistance anytime.' },
              { title: 'Trusted Brand', desc: 'Thousands of happy travelers.' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To deliver exceptional travel experiences by combining comfort,
            cultural authenticity, and reliable service — ensuring every
            journey becomes a lifetime memory.
          </p>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
