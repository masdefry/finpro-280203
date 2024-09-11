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

  // Log the incoming request body for debugging
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
    // Use a transaction to ensure invoice and items are updated together
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

      // Delete existing items before re-adding
      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: invoice.id },
      });

      // Re-create Invoice Items
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

// Delete an invoice by ID
export const deleteInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.invoice.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
};
