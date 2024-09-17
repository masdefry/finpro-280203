import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new invoice
export const createInvoice = async (req: Request, res: Response) => {
  const {
    userId,
    fromName, fromEmail, fromAddress, fromPhone, fromBusinessNumber,
    billToName, billToEmail, billToAddress, billToPhone, billToMobile, billToFax,
    invoiceTitle, description,
    invoiceNumber, date, terms, subtotal, totalAmount, balanceDue, notes,
    items
  } = req.body;

  console.log('Request body:', req.body);

  if (!userId || !fromName || !billToName || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invalid data, please fill all required fields.' });
  }

  try {
    const newInvoice = await prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.create({
        data: {
          userId: parseInt(userId, 10),
          fromName,
          fromEmail,
          fromAddress,
          fromPhone,
          fromBusinessNumber,
          billToName,
          billToEmail,
          billToAddress,
          billToPhone,
          billToMobile,
          billToFax,
          invoiceTitle,
          description,
          invoiceNumber,
          date: new Date(date),
          terms,
          subtotal: parseFloat(subtotal),
          totalAmount: parseFloat(totalAmount),
          balanceDue: parseFloat(balanceDue),
          notes,
        },
      });

      const invoiceItems = items.map((item: any) => ({
        invoiceId: invoice.id,
        description: item.description,
        quantity: parseInt(item.quantity, 10),
        rate: parseFloat(item.rate),
        amount: parseFloat(item.amount),
      }));

      await prisma.invoiceItem.createMany({
        data: invoiceItems,
      });

      return invoice;
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

// Get all invoices
export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        user: true,
        items: true,
      },
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

// Get an invoice by invoiceNumber
export const getInvoiceByInvoiceNumber = async (req: Request, res: Response) => {
  const { invoiceNumber } = req.params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceNumber: String(invoiceNumber) },
      include: {
        user: true,
        items: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
};

// Get clients (distinct) based on invoices for a specific user
export const getClientsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log('Fetching clients for user:', userId);  // Logging untuk debugging

  try {
    // Cari invoice dengan userId tertentu dan ambil data klien secara unik
    const clients = await prisma.invoice.findMany({
      where: { userId: Number(userId) },  // Filter berdasarkan userId
      distinct: ['billToName', 'billToEmail'],  // Pastikan klien unik berdasarkan nama dan email
      select: {  // Pilih kolom yang dibutuhkan
        billToName: true,
        billToEmail: true,
        billToAddress: true,
        billToPhone: true,
        billToMobile: true,
        billToFax: true,
      },
    });

    // Jika tidak ada klien yang ditemukan, kembalikan status 404
    if (clients.length === 0) {
      console.log(`No clients found for user ${userId}`);
      return res.status(404).json({ message: 'No clients found' });
    }

    // Kembalikan daftar klien dalam bentuk JSON
    res.status(200).json(clients);
  } catch (error) {
    // Error handling jika ada masalah saat query
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};


// Update an invoice by ID
export const updateInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    fromName, fromEmail, fromAddress, fromPhone, fromBusinessNumber,
    billToName, billToEmail, billToAddress, billToPhone, billToMobile, billToFax,
    invoiceTitle, description,
    invoiceNumber, date, terms, subtotal, totalAmount, balanceDue, notes,
    items
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Invoice must have at least one item.' });
  }

  try {
    const updatedInvoice = await prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.update({
        where: { id: Number(id) },
        data: {
          fromName,
          fromEmail,
          fromAddress,
          fromPhone,
          fromBusinessNumber,
          billToName,
          billToEmail,
          billToAddress,
          billToPhone,
          billToMobile,
          billToFax,
          invoiceTitle,
          description,
          invoiceNumber,
          date: new Date(date),
          terms,
          subtotal: parseFloat(subtotal),
          totalAmount: parseFloat(totalAmount),
          balanceDue: parseFloat(balanceDue),
          notes,
        },
      });

      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: invoice.id },
      });

      const invoiceItems = items.map((item: any) => ({
        invoiceId: invoice.id,
        description: item.description,
        quantity: parseInt(item.quantity, 10),
        rate: parseFloat(item.rate),
        amount: parseFloat(item.amount),
      }));

      await prisma.invoiceItem.createMany({
        data: invoiceItems,
      });

      return invoice;
    });

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
};


export const deleteInvoice = async (req: Request, res: Response) => {
  const { invoiceNumber } = req.params;

  try {
    const invoice = await prisma.invoice.delete({
      where: { invoiceNumber: String(invoiceNumber) },
    });

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
};



