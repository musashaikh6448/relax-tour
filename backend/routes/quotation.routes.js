import express from 'express';
import {
  getAllQuotations,
  createQuotation,
  updateQuotation,
  deleteQuotation,
} from '../controllers/quotation.controller.js';

import { generateQuotationPdfController } from '../controllers/quotation.pdf.controller.js';

const router = express.Router();

router.get('/', getAllQuotations);
router.post('/', createQuotation);
router.put('/:id', updateQuotation);
router.delete('/:id', deleteQuotation);

// ✅ PDF ROUTE
router.get('/:id/pdf', generateQuotationPdfController);

export default router;