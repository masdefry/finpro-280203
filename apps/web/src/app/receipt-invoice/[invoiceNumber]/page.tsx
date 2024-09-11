'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

const ReceiptInvoicePage = ({ params }: { params: { invoiceNumber: string } }) => {
  const { invoiceNumber } = params;  // Get invoiceNumber from URL params

  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (invoiceNumber) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/invoices/${invoiceNumber}`);
          setInvoice(response.data);
        } catch (error) {
          console.error('Error fetching invoice:', error);
        }
      };
      fetchInvoice();
    }
  }, [invoiceNumber]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-16">
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Invoice Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <h1 className="text-4xl font-bold">Invoice Receipt</h1>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-md shadow hover:bg-gray-100">
            Print Invoice
          </button>
        </header>

        {/* Invoice Metadata */}
        <section className="p-6">
          <div className="flex justify-between items-center border-b pb-6">
            <div>
              <p className="text-lg font-semibold">Invoice Number:</p>
              <p className="text-xl text-gray-800">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Date:</p>
              <p className="text-xl text-gray-800">{new Date(invoice.date).toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        {/* Billing Information */}
        <section className="grid grid-cols-2 gap-6 px-6 pb-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Billed To</h2>
            <p className="text-gray-600">
              <strong>{invoice.billToName}</strong> <br />
              {invoice.billToEmail} <br />
              {invoice.billToAddress} <br />
              {invoice.billToPhone}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold mb-3">From</h2>
            <p className="text-gray-600">
              <strong>{invoice.fromName}</strong> <br />
              {invoice.fromEmail} <br />
              {invoice.fromAddress} <br />
              {invoice.fromPhone}
            </p>
          </div>
        </section>

        {/* Items Table */}
        <section className="px-6 pb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Invoice Items</h2>
          <div className="overflow-hidden shadow rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Rate</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {invoice.items.map((item: any, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-right">Rp {item.rate.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-right font-bold">Rp {item.amount.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Total Summary */}
        <section className="px-6 py-6 bg-gray-50">
          <div className="flex justify-end">
            <div className="w-full lg:w-1/3">
              <div className="flex justify-between py-2 text-lg text-gray-700">
                <span>Subtotal</span>
                <span>Rp {invoice.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-2 text-lg text-gray-700">
                <span>Balance Due</span>
                <span>Rp {invoice.balanceDue.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-3 border-t border-gray-300 text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">Rp {invoice.totalAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Notes */}
        <section className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-800">Additional Notes:</h3>
          <p className="text-gray-600 mt-2">{invoice.notes || 'No additional notes.'}</p>
        </section>
      </div>
    </div>
  );
};

export default ReceiptInvoicePage;
