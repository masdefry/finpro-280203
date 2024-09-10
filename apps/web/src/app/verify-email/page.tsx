'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const VerifyEmailPage = () => {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        setError('Token tidak ditemukan.');
        setIsVerifying(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/auth/verify-email?token=${token}`);
        if (response.status === 200) {
          setIsSuccess(true);
          toast.success('Verifikasi email berhasil!');
        } else {
          setError('Verifikasi email gagal.');
        }
      } catch (error: any) {
        setError(error.response?.data?.message || 'Terjadi kesalahan.');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, []);

  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <ToastContainer />
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center transition-all transform hover:scale-105 duration-300">
        {isVerifying ? (
          <p className="text-lg font-semibold text-gray-700 animate-pulse">Memverifikasi email Anda...</p>
        ) : isSuccess ? (
          <>
            <div className="flex justify-center items-center mb-6">
              <FaCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Email Berhasil Diverifikasi!</h2>
            <p className="mb-6 text-gray-600">Anda sekarang dapat login dengan akun Anda.</p>
            <button
              onClick={handleRedirect}
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Pergi ke Login
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center mb-6">
              <FaTimesCircle className="text-red-500 text-6xl" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Verifikasi Gagal</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            <button
              onClick={handleRedirect}
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Pergi ke Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
