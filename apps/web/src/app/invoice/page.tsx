'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Import store to get Redux state
import { FaTrash, FaFileInvoice, FaFeatherAlt } from 'react-icons/fa'; // Import icons for remove and view invoice

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
  // Ambil user dan token dari Redux store secara langsung
  const { user, token } = useSelector((state: RootState) => state.auth);

  // Fetch invoices from the server
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (user?.id && token) { // Pastikan user.id dan token tersedia
          const response = await axios.get(`http://localhost:8000/api/invoices?userId=${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Gunakan token langsung dari Redux
            },
          });
          setInvoices(response.data);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, [user?.id, token]); // Tambahkan token sebagai dependency

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
  const handleRemoveInvoice = async (invoiceNumber: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this invoice?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/invoices/${invoiceNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        });
        setInvoices((prev) => prev.filter((invoice) => invoice.invoiceNumber !== invoiceNumber));
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <FaFeatherAlt className="text-yellow-400 w-8 h-8" />
            <h1 className="text-3xl font-bold">My Invoices</h1>
          </div>
          <button
            onClick={() => router.push('/new-invoice')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            New Invoice
          </button>
        </header>

        {/* Search Filter */}
        <div className="mt-4 mb-6">
          <input
            type="text"
            placeholder="Search by invoice number, client name, or total amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Invoice Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Date</th>
                <th className="px-6 py-4 text-right text-sm font-bold">Total Amount</th>
                <th className="px-6 py-4 text-right text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-100 transition-all duration-200">
                    <td className="px-6 py-4 text-gray-800 font-medium">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-gray-800">{invoice.billToName}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(invoice.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right text-gray-800 font-bold">
                      Rp {invoice.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end space-x-4">
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
                        onClick={() => handleRemoveInvoice(invoice.invoiceNumber)} 
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
    </div>
  );
};

export default InvoiceListPage;
