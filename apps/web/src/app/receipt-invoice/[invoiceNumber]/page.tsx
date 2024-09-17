'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFeatherAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const ReceiptInvoicePage = ({ params }: { params: { invoiceNumber: string } }) => {
  const { invoiceNumber } = params;

  // Ambil token dan user dari Redux store
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [invoice, setInvoice] = useState<any>(null);
  const [isSending, setIsSending] = useState(false); // State to track email sending status

  useEffect(() => {
    console.log("Redux token:", token); // Tambahkan log untuk memeriksa token
    console.log("Redux user:", user);

    if (invoiceNumber && token) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/invoices/${invoiceNumber}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pastikan token dikirim
            },
          });
          setInvoice(response.data);
        } catch (error) {
          console.error('Error fetching invoice:', error);
        }
      };
      fetchInvoice();
    }
  }, [invoiceNumber, token, user]);

  // Fungsi untuk mengirimkan invoice ke email
  const sendInvoiceByEmail = async () => {
    setIsSending(true);
    try {
      await axios.post(
        'http://localhost:8000/api/invoices/send-email',
        { invoiceNumber, recipientEmail: user?.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Invoice has been sent to email!'); // Ganti alert dengan toast success
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast.error('Failed to send invoice.'); // Ganti alert dengan toast error
    } finally {
      setIsSending(false);
    }
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-16">
      <ToastContainer /> {/* Tambahkan ToastContainer untuk menampilkan toast */}
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Invoice Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3">
            {/* Feather Icon */}
            <FaFeatherAlt className="text-yellow-400 w-8 h-8" />
            {/* Brand Name */}
            <h1 className="text-4xl font-extrabold tracking-wide">Finquill Invoice</h1>
          </div>
          <button
            className="flex items-center bg-white text-gray-800 px-6 py-2 rounded-md shadow-lg hover:bg-gray-100 transition duration-300"
            onClick={sendInvoiceByEmail} // Tambahkan event handler untuk mengirim email
            disabled={isSending} // Disable tombol saat sedang mengirim
          >
            {isSending ? 'Sending...' : 'Send to Email'}
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
