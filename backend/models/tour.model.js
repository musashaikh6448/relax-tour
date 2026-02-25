import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    points: [{ type: String }],
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: ['Domestic', 'International'],
      required: true,
    },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },

    /* 🔥 NEW FIELDS */
    overview: { type: String, required: true },

    itinerary: [itinerarySchema],

    included: [{ type: String }],
    excluded: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Tour', tourSchema);