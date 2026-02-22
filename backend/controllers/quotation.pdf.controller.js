import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Quotation from '../models/quotation.model.js';

export const generateQuotationPdfController = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const fileName = `quotation-${quotation._id}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(22).text('Travel Quotation', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Customer: ${quotation.customerName}`);
    doc.text(`Destination: ${quotation.destination}`);
    doc.text(`Travel Date: ${quotation.travelDate}`);
    doc.text(`People: ${quotation.people}`);
    doc.text(`Budget: ${quotation.budget || '-'}`);
    doc.text(`Status: ${quotation.status}`);

    doc.end();

    res.json({
      pdfUrl: `http://localhost:5000/uploads/${fileName}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'PDF generation failed' });
  }
};