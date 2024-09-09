'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {isVerifying ? (
          <p className="text-lg font-semibold">Memverifikasi email Anda...</p>
        ) : isSuccess ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-6">Email berhasil diverifikasi!</h2>
            <p className="mb-4">Anda sekarang dapat login dengan akun Anda.</p>
            <button onClick={handleRedirect} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition">Pergi ke Login</button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-6">Verifikasi gagal</h2>
            <p className="mb-4">{error}</p>
            <button onClick={handleRedirect} className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition">Pergi ke Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
