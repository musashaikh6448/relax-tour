import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateQuotationPdf = async (quotation) => {
  const filePath = `uploads/quotation-${quotation.quotationNumber}.pdf`;
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Travel Quotation', { align: 'center' });
  doc.moveDown();

  doc.text(`Quotation No: ${quotation.quotationNumber}`);
  doc.text(`Total Amount: ₹${quotation.totalAmount}`);

  doc.end();

  return filePath;
};