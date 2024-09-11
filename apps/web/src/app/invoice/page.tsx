'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Import store to get Redux state
import { FaTrash, FaFileInvoice } from 'react-icons/fa'; // Import icons for remove and view invoice

interface Invoice {
  id: number;
  invoiceNumber: string;
  billToName: string;
  date: string;
  totalAmount: number;
}

const InvoiceListPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user); // Get the user from Redux store

  // Fetch invoices from the server
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, []);

  // Filter invoices based on multiple fields: invoiceNumber, billToName, and totalAmount
  const filteredInvoices = invoices.filter((invoice) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(searchLower) || // Match invoice number
      invoice.billToName.toLowerCase().includes(searchLower) || // Match billToName
      invoice.totalAmount.toString().includes(searchLower) // Match totalAmount as string
    );
  });

  // Handle invoice removal
  const handleRemoveInvoice = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this invoice?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/invoices/${id}`);
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  // Handle navigation to invoice receipt page
  const handleViewInvoice = (invoiceNumber: string) => {
    router.push(`/receipt-invoice/${invoiceNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <button
            onClick={() => router.push('/new-invoice')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            New Invoice
          </button>
        </header>

        {/* Search Filter */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by invoice number, client name, or total amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
        </div>

        {/* Invoice Table */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left border-b border-gray-200">Invoice Number</th>
              <th className="px-6 py-3 text-left border-b border-gray-200">Client Name</th>
              <th className="px-6 py-3 text-left border-b border-gray-200">Date</th>
              <th className="px-6 py-3 text-right border-b border-gray-200">Total Amount</th>
              <th className="px-6 py-3 text-right border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No invoices found.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-left">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-left">
                    {invoice.billToName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-left">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-right">
                    Rp {invoice.totalAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-right flex justify-end gap-4">
                    {/* View Invoice Icon */}
                    <button
                      onClick={() => handleViewInvoice(invoice.invoiceNumber)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View Invoice"
                    >
                      <FaFileInvoice />
                    </button>

                    {/* Remove Invoice Icon */}
                    <button
                      onClick={() => handleRemoveInvoice(invoice.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove Invoice"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceListPage;
