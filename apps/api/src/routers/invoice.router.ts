import { Router } from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceByInvoiceNumber, // Ganti dari getInvoiceById ke getInvoiceByInvoiceNumber
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoice.controller';

const router = Router();

// Create a new invoice
router.post('/', createInvoice);

// Get all invoices
router.get('/', getAllInvoices);

// Get a specific invoice by invoiceNumber (instead of ID)
router.get('/:invoiceNumber', getInvoiceByInvoiceNumber);

// Update a specific invoice by ID
router.put('/:id', updateInvoice);

// Delete a specific invoice by ID
router.delete('/:id', deleteInvoice);

export default router;
