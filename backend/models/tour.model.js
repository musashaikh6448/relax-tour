import mongoose from 'mongoose';

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
    image: { type: String, required: true }, // 👈 IMAGE URL
  },
  { timestamps: true }
);

export default mongoose.model('Tour', tourSchema);