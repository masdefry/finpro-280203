'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFeatherAlt, FaUser, FaSignOutAlt, FaBars, FaFileInvoice, FaUserCircle } from 'react-icons/fa';

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
<header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white shadow-lg">
  <div className="flex items-center space-x-3">
    {/* Feather Icon (can replace with a custom SVG or image) */}
    <FaFeatherAlt className="text-yellow-400 w-8 h-8" />
    {/* Brand Name */}
    <h1 className="text-4xl font-extrabold tracking-wide">Finquill Invoice</h1>
  </div>
  <button className="flex items-center bg-white text-gray-800 px-6 py-2 rounded-md shadow-lg hover:bg-gray-100 transition duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
    </svg>
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
              <thead className="bg-gradient-to-r from-gray-50 to-gray-200">
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
          <h3 className="text-lg font-semibold  text-gray-800">Additional Notes:</h3>
          <p className="text-gray-600 mt-2">{invoice.notes || 'No additional notes.'}</p>
        </section>
      </div>
    </div>
  );
};

export default ReceiptInvoicePage;
