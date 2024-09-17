'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FaFeatherAlt } from 'react-icons/fa'; // Feather icon for Finquill

interface Client {
  billToName: string;
  billToEmail: string;
  billToAddress: string;
  billToPhone: string;
}

const ClientListPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil token dan user dari Redux store
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchClients = async () => {
      if (user && user.id && token) {
        try {
          const response = await axios.get(`http://localhost:8000/api/invoices/clients/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,  // Gunakan token di header Authorization
            },
          });
          setClients(response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchClients();
  }, [user, token]);  // Gunakan user dan token sebagai dependensi useEffect

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white">
        <FaFeatherAlt className="text-5xl animate-bounce" />
        <span className="ml-4 text-2xl">Loading your clients...</span>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white">
        <FaFeatherAlt className="text-5xl" />
        <span className="ml-4 text-2xl">No clients found.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white">
          <div className="flex items-center space-x-2">
            <FaFeatherAlt className="text-yellow-400 w-8 h-8" />
            <h1 className="text-3xl font-bold">My Clients</h1>
          </div>
        </header>

        {/* Client Table */}
        <section className="p-6">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-left py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{client.billToName}</td>
                  <td className="py-3 px-4">{client.billToEmail}</td>
                  <td className="py-3 px-4">{client.billToAddress}</td>
                  <td className="py-3 px-4">{client.billToPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default ClientListPage;
