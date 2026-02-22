import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    destination: { type: String, required: true },
    travelDate: { type: String, required: true },
    people: { type: Number, required: true },
    budget: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Processed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Quotation', quotationSchema);