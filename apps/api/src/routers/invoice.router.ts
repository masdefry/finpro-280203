import { Router } from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceByInvoiceNumber,
  getClientsByUserId, 
  updateInvoice,
  deleteInvoice,
  sendInvoiceEmail, // Tambahkan import untuk fungsi pengiriman email
} from '../controllers/invoice.controller';
import { authUser } from '../middleware/auth.middleware'; // Import auth middleware

const router = Router();

// Add a route to get all clients for a specific user (should be placed before any route with dynamic parameters)
router.get('/clients/:userId', authUser, getClientsByUserId); // Protected route with authUser

// Create a new invoice
router.post('/', authUser, createInvoice); // Protected route with authUser

// Get all invoices for the logged-in user
router.get('/', authUser, getAllInvoices); // Protected route with authUser

// Get a specific invoice by invoiceNumber (instead of ID)
router.get('/:invoiceNumber', authUser, getInvoiceByInvoiceNumber); // Protected route with authUser

// Update a specific invoice by ID
router.put('/:id', authUser, updateInvoice); // Protected route with authUser

// Delete a specific invoice by invoiceNumber
router.delete('/:invoiceNumber', authUser, deleteInvoice); // Protected route with authUser

// Route to send an invoice to the client's email
router.post('/send-email', authUser, sendInvoiceEmail); // Protected route to send invoice via email

export default router;
