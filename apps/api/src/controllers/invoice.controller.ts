import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Menggunakan Gmail sebagai contoh
  auth: {
    user: process.env.EMAIL_USER, // Ambil dari .env
    pass: process.env.EMAIL_PASS, // Ambil dari .env
  },
});

// Fungsi untuk membuat invoice
export const createInvoice = async (req: Request, res: Response) => {
  const {
    fromName, fromEmail, fromAddress, fromPhone, fromBusinessNumber,
    billToName, billToEmail, billToAddress, billToPhone, billToMobile, billToFax,
    invoiceTitle, description,
    invoiceNumber, date, terms, subtotal, totalAmount, balanceDue, notes,
    items
  } = req.body;

  const userId = req.user?.id; // Mengambil userId dari token yang sudah diverifikasi

  if (!userId || !fromName || !billToName || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invalid data, please fill all required fields.' });
  }

  try {
    const newInvoice = await prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.create({
        data: {
          userId: userId,
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

// Fungsi untuk mengirim email dengan invoice
export const sendInvoiceEmail = async (req: Request, res: Response) => {
  const { invoiceNumber, recipientEmail } = req.body;

  try {
    // Ambil data invoice berdasarkan invoiceNumber
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceNumber },
      include: { items: true },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Template email yang diperbarui dengan HTML dan CSS sederhana
const emailContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
  <h2 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 1px solid #ddd;">Invoice: ${invoice.invoiceNumber}</h2>

  <div style="padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd; margin-bottom: 20px;">
    <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
    <p><strong>Client:</strong> ${invoice.billToName}</p>
    <p><strong>Total Amount:</strong> <span style="color: blue;">Rp ${invoice.totalAmount.toLocaleString('id-ID')}</span></p>
  </div>

  <h3 style="border-bottom: 2px solid #ddd; padding-bottom: 5px;">Invoice Items</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    <thead>
      <tr style="background-color: #f9f9f9; text-align: left;">
        <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
        <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Quantity</th>
        <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Rate</th>
        <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items.map(item => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${item.description}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Rp ${item.rate.toLocaleString('id-ID')}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Rp ${item.amount.toLocaleString('id-ID')}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div style="margin-top: 20px;">
    <p style="font-weight: bold; text-align: right; margin: 5px 0;"><strong>Subtotal:</strong> Rp ${invoice.subtotal.toLocaleString('id-ID')}</p>
    <p style="font-weight: bold; text-align: right; margin: 5px 0;"><strong>Balance Due:</strong> Rp ${invoice.balanceDue.toLocaleString('id-ID')}</p>
    <p style="font-weight: bold; text-align: right; font-size: 18px; margin: 10px 0; color: blue;"><strong>Total Amount:</strong> Rp ${invoice.totalAmount.toLocaleString('id-ID')}</p>
  </div>

  <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ddd;">
    <p><strong>Additional Notes:</strong></p>
    <p>${invoice.notes || 'No additional notes.'}</p>
  </div>
</div>
`;



    // Kirim email dengan nodemailer
    await transporter.sendMail({
      from: `"Finquill Invoice" <${process.env.EMAIL_USER}>`, // Ganti dengan email Anda
      to: recipientEmail, // Alamat email penerima
      subject: `Invoice #${invoice.invoiceNumber}`, // Subjek email
      html: emailContent, // Isi email dalam format HTML
    });

    res.status(200).json({ message: 'Invoice sent successfully to ' + recipientEmail });
  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: 'Failed to send invoice email' });
  }
};

// Fungsi lainnya tetap sama
export const getAllInvoices = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Mengambil userId dari token

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId },  // Filter berdasarkan userId
      include: {
        items: true,
      },
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

// Get an invoice by invoiceNumber and userId
export const getInvoiceByInvoiceNumber = async (req: Request, res: Response) => {
  const { invoiceNumber } = req.params;
  const userId = req.user?.id; // Mengambil userId dari token yang sudah diverifikasi

  try {
    const invoice = await prisma.invoice.findFirst({
      where: { 
        invoiceNumber: String(invoiceNumber),
        userId: userId  // Filter berdasarkan userId
      },
      include: {
        user: true,
        items: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found or does not belong to the user' });
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

// Delete an invoice by ID
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
