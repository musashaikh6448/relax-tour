import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Save, Filter } from 'lucide-react';
import { apiRequest } from '../../src/services/api';

const emptyTour = {
  name: '',
  location: '',
  category: 'Domestic',
  duration: '',
  price: '',
  image: '',
  overview: '',
  itinerary: [
    { day: 1, title: '', points: [''] }
  ],
  included: [''],
  excluded: [''],
};

const TourManagement = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] =
    useState<'All' | 'Domestic' | 'International'>('All');

  const [modal, setModal] =
    useState<'add' | 'edit' | 'delete' | 'view' | null>(null);
  const [form, setForm] = useState<any>(emptyTour);
  const [selected, setSelected] = useState<any>(null);

  const fetchTours = async () => {
    const data = await apiRequest('/tours');
    setTours(data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const saveTour = async () => {
    const payload = {
      ...form,
      price: Number(form.price),
    };

    if (modal === 'add') {
      await apiRequest('/tours', 'POST', payload);
    } else {
      await apiRequest(`/tours/${selected._id}`, 'PUT', payload);
    }

    setModal(null);
    setForm(emptyTour);
    fetchTours();
  };

  const deleteTour = async () => {
    await apiRequest(`/tours/${selected._id}`, 'DELETE');
    setModal(null);
    fetchTours();
  };

  const filteredTours = tours.filter(t => {
    const matchSearch =
      (t.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (t.location?.toLowerCase() || '').includes(search.toLowerCase());

    const matchFilter = filter === 'All' || t.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">

      {/* SEARCH + FILTER + ADD */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              placeholder="Search tours by name or location..."
              className="pl-9 pr-4 py-2.5 border rounded-xl w-full"
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
              className="pl-8 pr-4 py-2.5 border rounded-xl bg-white"
            >
              <option value="All">All</option>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setForm(emptyTour);
            setModal('add');
          }}
          className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold"
        >
          <Plus size={16} className="inline mr-1" /> Add New Tour
        </button>
      </div>

      {/* TABLE (UNCHANGED) */}
      <div className="bg-white rounded-3xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Tour Info</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Duration</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTours.map(t => (
              <tr key={t._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-orange-600">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.category === 'Domestic'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {t.category}
                  </span>
                </td>

                <td className="px-6 py-5">{t.duration}</td>
                <td className="px-6 py-5 font-bold">₹{t.price}</td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-4">
                    <Eye
                      onClick={() => {
                        setSelected(t);
                        setModal('view');
                      }}
                    />
                    <Edit
                      onClick={() => {
                        setSelected(t);
                        setForm(t);
                        setModal('edit');
                      }}
                    />
                    <Trash2
                      onClick={() => {
                        setSelected(t);
                        setModal('delete');
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL (EXTENDED) */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-4">

            {['name', 'location', 'duration', 'price', 'image'].map(f => (
              <input
                key={f}
                placeholder={f}
                value={form[f]}
                onChange={e => setForm({ ...form, [f]: e.target.value })}
                className="border w-full px-4 py-2 rounded-xl"
              />
            ))}

            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="border w-full px-4 py-2 rounded-xl"
            >
              <option>Domestic</option>
              <option>International</option>
            </select>

            {/* OVERVIEW */}
            <textarea
              placeholder="Tour Overview"
              value={form.overview}
              onChange={e => setForm({ ...form, overview: e.target.value })}
              className="border w-full px-4 py-2 rounded-xl"
              rows={3}
            />

            {/* ITINERARY */}
            <h4 className="font-bold">Day-wise Itinerary</h4>
            {form.itinerary.map((day: any, idx: number) => (
              <div key={idx} className="border p-3 rounded-xl">
                <input
                  placeholder="Day title"
                  value={day.title}
                  onChange={e => {
                    const arr = [...form.itinerary];
                    arr[idx].title = e.target.value;
                    setForm({ ...form, itinerary: arr });
                  }}
                  className="border w-full px-3 py-2 rounded mb-2"
                />

                {day.points.map((p: string, i: number) => (
                  <input
                    key={i}
                    placeholder="Point"
                    value={p}
                    onChange={e => {
                      const arr = [...form.itinerary];
                      arr[idx].points[i] = e.target.value;
                      setForm({ ...form, itinerary: arr });
                    }}
                    className="border w-full px-3 py-2 rounded mb-1"
                  />
                ))}

                <button
                  className="text-orange-600 text-sm"
                  onClick={() => {
                    const arr = [...form.itinerary];
                    arr[idx].points.push('');
                    setForm({ ...form, itinerary: arr });
                  }}
                >
                  + Add Point
                </button>
              </div>
            ))}

            <button
              className="text-orange-600"
              onClick={() =>
                setForm({
                  ...form,
                  itinerary: [
                    ...form.itinerary,
                    {
                      day: form.itinerary.length + 1,
                      title: '',
                      points: [''],
                    },
                  ],
                })
              }
            >
              + Add Day
            </button>

            {/* INCLUDED */}
            <h4 className="font-bold">What's Included</h4>
            {form.included.map((i: string, idx: number) => (
              <input
                key={idx}
                value={i}
                onChange={e => {
                  const arr = [...form.included];
                  arr[idx] = e.target.value;
                  setForm({ ...form, included: arr });
                }}
                className="border w-full px-3 py-2 rounded"
              />
            ))}
            <button
              className="text-orange-600 text-sm"
              onClick={() =>
                setForm({ ...form, included: [...form.included, ''] })
              }
            >
              + Add Included
            </button>

            {/* EXCLUDED */}
            <h4 className="font-bold">What's Excluded</h4>
            {form.excluded.map((i: string, idx: number) => (
              <input
                key={idx}
                value={i}
                onChange={e => {
                  const arr = [...form.excluded];
                  arr[idx] = e.target.value;
                  setForm({ ...form, excluded: arr });
                }}
                className="border w-full px-3 py-2 rounded"
              />
            ))}
            <button
              className="text-orange-600 text-sm"
              onClick={() =>
                setForm({ ...form, excluded: [...form.excluded, ''] })
              }
            >
              + Add Excluded
            </button>

            <button
              onClick={saveTour}
              className="bg-orange-600 text-white w-full py-3 rounded-xl font-bold"
            >
              <Save size={16} className="inline mr-1" /> Save Tour
            </button>

            <button
              onClick={() => setModal(null)}
              className="w-full text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL (UNCHANGED) */}
      {modal === 'delete' && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-2xl p-6 space-y-4">
            <p className="font-bold text-lg">Delete this tour?</p>
            <button
              onClick={deleteTour}
              className="bg-red-600 text-white w-full py-3 rounded-xl"
            >
              Delete
            </button>
            <button onClick={() => setModal(null)} className="w-full text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourManagement;