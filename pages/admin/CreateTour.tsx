import React, { useState } from 'react';
import { apiRequest } from '../../src/services/api';

const CreateTour: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    location: '',
    category: 'Domestic',
    duration: '',
    price: '',
    image: '',
    overview: '',
    included: [''],
    excluded: [''],
    itinerary: [
      {
        day: 1,
        title: '',
        points: [''],
      },
    ],
  });

  /* ===== HANDLERS ===== */
  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const updateArray = (
    field: 'included' | 'excluded',
    index: number,
    value: string
  ) => {
    const arr = [...form[field]];
    arr[index] = value;
    handleChange(field, arr);
  };

  const addArrayItem = (field: 'included' | 'excluded') => {
    handleChange(field, [...form[field], '']);
  };

  const updateItineraryTitle = (index: number, value: string) => {
    const list = [...form.itinerary];
    list[index].title = value;
    handleChange('itinerary', list);
  };

  const updateItineraryPoint = (
    dayIndex: number,
    pointIndex: number,
    value: string
  ) => {
    const list = [...form.itinerary];
    list[dayIndex].points[pointIndex] = value;
    handleChange('itinerary', list);
  };

  const addItineraryPoint = (dayIndex: number) => {
    const list = [...form.itinerary];
    list[dayIndex].points.push('');
    handleChange('itinerary', list);
  };

  const addItineraryDay = () => {
    handleChange('itinerary', [
      ...form.itinerary,
      {
        day: form.itinerary.length + 1,
        title: '',
        points: [''],
      },
    ]);
  };

  const submit = async () => {
    try {
      setLoading(true);

      await apiRequest('/tours', 'POST', {
        ...form,
        price: Number(form.price),
      });

      alert('Tour created successfully');

      setForm({
        name: '',
        location: '',
        category: 'Domestic',
        duration: '',
        price: '',
        image: '',
        overview: '',
        included: [''],
        excluded: [''],
        itinerary: [
          {
            day: 1,
            title: '',
            points: [''],
          },
        ],
      });
    } catch {
      alert('Failed to create tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl p-10 space-y-10">
      <h1 className="text-2xl font-bold">Create Tour</h1>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-6">
        <input
          placeholder="Tour Name"
          className="border px-4 py-3 rounded-xl"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <input
          placeholder="Location"
          className="border px-4 py-3 rounded-xl"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />

        <select
          className="border px-4 py-3 rounded-xl"
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="Domestic">Domestic</option>
          <option value="International">International</option>
        </select>

        <input
          placeholder="Duration (e.g. 7 Days / 6 Nights)"
          className="border px-4 py-3 rounded-xl"
          value={form.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
        />

        <input
          placeholder="Price per person"
          type="number"
          className="border px-4 py-3 rounded-xl"
          value={form.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="border px-4 py-3 rounded-xl"
          value={form.image}
          onChange={(e) => handleChange('image', e.target.value)}
        />
      </div>

      {/* OVERVIEW */}
      <div>
        <h3 className="font-bold mb-2">Overview</h3>
        <textarea
          rows={4}
          className="w-full border px-4 py-3 rounded-xl"
          value={form.overview}
          onChange={(e) => handleChange('overview', e.target.value)}
        />
      </div>

      {/* INCLUDED */}
      <div>
        <h3 className="font-bold mb-2">What's Included</h3>
        {form.included.map((item, i) => (
          <input
            key={i}
            className="w-full border px-4 py-3 rounded-xl mb-2"
            value={item}
            onChange={(e) => updateArray('included', i, e.target.value)}
          />
        ))}
        <button
          className="text-orange-600 font-bold"
          onClick={() => addArrayItem('included')}
        >
          + Add Included
        </button>
      </div>

      {/* EXCLUDED */}
      <div>
        <h3 className="font-bold mb-2">What's Excluded</h3>
        {form.excluded.map((item, i) => (
          <input
            key={i}
            className="w-full border px-4 py-3 rounded-xl mb-2"
            value={item}
            onChange={(e) => updateArray('excluded', i, e.target.value)}
          />
        ))}
        <button
          className="text-orange-600 font-bold"
          onClick={() => addArrayItem('excluded')}
        >
          + Add Excluded
        </button>
      </div>

      {/* ITINERARY */}
      <div>
        <h3 className="font-bold mb-4">Day-wise Itinerary</h3>

        {form.itinerary.map((day, i) => (
          <div key={i} className="border rounded-2xl p-6 mb-6">
            <p className="font-bold mb-2">Day {day.day}</p>

            <input
              placeholder="Day Title"
              className="w-full border px-4 py-3 rounded-xl mb-3"
              value={day.title}
              onChange={(e) =>
                updateItineraryTitle(i, e.target.value)
              }
            />

            {day.points.map((p, pi) => (
              <input
                key={pi}
                placeholder="Point"
                className="w-full border px-4 py-3 rounded-xl mb-2"
                value={p}
                onChange={(e) =>
                  updateItineraryPoint(i, pi, e.target.value)
                }
              />
            ))}

            <button
              className="text-orange-600 font-bold"
              onClick={() => addItineraryPoint(i)}
            >
              + Add Point
            </button>
          </div>
        ))}

        <button
          className="text-orange-600 font-bold"
          onClick={addItineraryDay}
        >
          + Add Day
        </button>
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        onClick={submit}
        className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold"
      >
        {loading ? 'Creating...' : 'Create Tour'}
      </button>
    </div>
  );
};

export default CreateTour;