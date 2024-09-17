import { Router } from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceByInvoiceNumber,
  getClientsByUserId, 
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoice.controller';

const router = Router();

// Add a route to get all clients for a specific user (should be placed before any route with dynamic parameters)
router.get('/clients/:userId', getClientsByUserId);

// Create a new invoice
router.post('/', createInvoice);

// Get all invoices
router.get('/', getAllInvoices);

// Get a specific invoice by invoiceNumber (instead of ID)
router.get('/:invoiceNumber', getInvoiceByInvoiceNumber);

// Update a specific invoice by ID
router.put('/:id', updateInvoice);

// Delete a specific invoice by invoiceNumber
router.delete('/:invoiceNumber', deleteInvoice);

export default router;
