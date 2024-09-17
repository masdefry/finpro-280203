'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa'; // Import icon trash

interface Item {
  description: string;
  quantity: number;
  rate: string;
  amount: string;
}

const InvoicePage = () => {
  const [formData, setFormData] = useState<{
    userId: string;
    fromName: string;
    fromEmail: string;
    fromAddress: string;
    fromPhone: string;
    fromBusinessNumber: string;
    billToName: string;
    billToEmail: string;
    billToAddress: string;
    billToPhone: string;
    billToMobile: string;
    billToFax: string;
    invoiceTitle: string;
    invoiceNumber: string;
    date: string;
    terms: string;
    subtotal: string;
    totalAmount: string;
    balanceDue: string;
    notes: string;
    items: Item[];
  }>({
    userId: '', 
    fromName: '',
    fromEmail: '',
    fromAddress: '',
    fromPhone: '',
    fromBusinessNumber: '',
    billToName: '',
    billToEmail: '',
    billToAddress: '',
    billToPhone: '',
    billToMobile: '',
    billToFax: '',
    invoiceTitle: '',
    invoiceNumber: '',
    date: '',
    terms: 'On Receipt',
    subtotal: '0',
    totalAmount: '0',
    balanceDue: '',
    notes: '',
    items: [{ description: '', quantity: 1, rate: '', amount: '' }]
  });

  const router = useRouter();

  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const generateInvoiceNumber = () => {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const randomNum = Math.floor(Math.random() * 1000);
      const invoiceNumber = `INV${year}${month}${day}-${randomNum}`;
      setFormData(prevFormData => ({ ...prevFormData, invoiceNumber, date: date.toISOString().substring(0, 10) }));
    };

    generateInvoiceNumber();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        userId: user.id.toString(),
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];

    if (name === 'amount' || name === 'rate') {
      const formattedValue = value.replace(/[^0-9.]/g, '');
      if (name === 'amount') {
        newItems[index].amount = formattedValue;
      } else if (name === 'rate') {
        newItems[index].rate = formattedValue;
      }
    } else if (name === 'quantity') {
      const parsedQuantity = parseInt(value, 10);
      newItems[index].quantity = isNaN(parsedQuantity) ? 1 : parsedQuantity;
    } else if (name === 'description') {
      newItems[index].description = value;
    }

    setFormData({
      ...formData,
      items: newItems,
    });

    calculateTotals(newItems);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: '', amount: '' }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
    });
    calculateTotals(newItems);
  };

  const formatRupiah = (amount: string | number) => {
    const amountNumber = parseFloat(amount.toString());
    if (isNaN(amountNumber)) return '';
    return amountNumber.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  const calculateTotals = (items: Item[]) => {
    let subtotal = 0;

    items.forEach((item) => {
      const itemTotal = parseFloat(item.rate) * item.quantity;
      if (!isNaN(itemTotal)) {
        subtotal += itemTotal;
        item.amount = itemTotal.toString();
      }
    });

    setFormData({
      ...formData,
      subtotal: subtotal.toString(),
      totalAmount: subtotal.toString(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      items: formData.items.map(item => ({
        description: item.description,
        quantity: Number(item.quantity),
        rate: Number(item.rate),
        amount: Number(item.amount)
      })),
      subtotal: Number(formData.subtotal),
      totalAmount: Number(formData.totalAmount),
      balanceDue: Number(formData.balanceDue),
    };

    try {
      await axios.post('http://localhost:8000/api/invoices', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Menggunakan token dari Redux
        },
      });
      toast.success('Invoice successfully created!'); // Show success toast
      setTimeout(() => router.push('/invoice'), 2000); // Navigate after delay
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error creating invoice: ${error.response?.data?.message || error.message}`); // Show error toast
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-16">
      <div className="max-w-6xl mx-auto bg-white p-10 shadow-lg rounded-lg">
        <ToastContainer /> {/* Toastify container */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Invoice</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Email Invoice</button>
        </header>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Invoice Title */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-semibold text-lg">Invoice Title</h2>
              <input
                type="text"
                name="invoiceTitle"
                value={formData.invoiceTitle}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                placeholder="Enter Invoice Title"
                required
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Invoice Number</h2>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                disabled
              />
            </div>
          </div>

          {/* FROM and BILL TO Section */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* From Section */}
            <div>
              <h2 className="font-semibold text-xl mb-4">From</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">Name</label>
                  <input
                    type="text"
                    name="fromName"
                    value={formData.fromName}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="fromEmail"
                    value={formData.fromEmail}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Address</label>
                  <input
                    type="text"
                    name="fromAddress"
                    value={formData.fromAddress}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Phone</label>
                  <input
                    type="text"
                    name="fromPhone"
                    value={formData.fromPhone}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  />
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div>
              <h2 className="font-semibold text-xl mb-4">Bill To</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">Client Name</label>
                  <input
                    type="text"
                    name="billToName"
                    value={formData.billToName}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Client Email</label>
                  <input
                    type="email"
                    name="billToEmail"
                    value={formData.billToEmail}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Client Address</label>
                  <input
                    type="text"
                    name="billToAddress"
                    value={formData.billToAddress}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Client Phone</label>
                  <input
                    type="text"
                    name="billToPhone"
                    value={formData.billToPhone}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Item Description Table */}
          <div>
            <h2 className="font-semibold text-xl mb-4">Item Description</h2>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    placeholder="Enter item description"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Qty</label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Rate</label>
                  <input
                    type="text"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    placeholder="Enter rate"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={item.amount}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    disabled
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <label className="block text-gray-600">Subtotal</label>
              <input
                type="text"
                name="subtotal"
                value={formatRupiah(formData.subtotal)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-600">Total Amount</label>
              <input
                type="text"
                name="totalAmount"
                value={formatRupiah(formData.totalAmount)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-600">Balance Due</label>
              <input
                type="text"
                name="balanceDue"
                value={formData.balanceDue}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                placeholder="Enter Balance Due"
              />
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid lg:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-gray-600">Terms</label>
              <select
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="On Receipt">On Receipt</option>
                <option value="Next Day">Next Day</option>
                <option value="2 Days">2 Days</option>
                <option value="3 Days">3 Days</option>
                <option value="1 Week">1 Week</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                rows={3}
                placeholder="Enter any additional notes here"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200 w-full"
          >
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoicePage;
