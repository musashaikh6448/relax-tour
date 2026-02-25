import Quotation from '../models/quotation.model.js';
import Tour from '../models/tour.model.js';
import { generateQuotationPdf } from '../utils/pdf.js';

export const generateQuotationPdfController = async (req, res) => {
  try {
    // 1️⃣ Quotation lao
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    // 2️⃣ Us quotation ke destination se tour lao
    const tour = await Tour.findOne({
      name: quotation.destination,
    });

    if (!tour) {
      return res.status(404).json({
        message: 'Tour not found for this quotation',
      });
    }

    // 3️⃣ Dono pass karo PDF generator ko
    const pdfPath = await generateQuotationPdf(quotation, tour);

    // 4️⃣ (optional but good) save pdf url
    quotation.pdfUrl = `/${pdfPath}`;
    await quotation.save();

    // 5️⃣ response
    res.json({
      success: true,
      pdfUrl: quotation.pdfUrl,
    });
  } catch (error) {
    console.error('PDF ERROR:', error);
    res.status(500).json({ message: 'PDF generation failed' });
  }
};