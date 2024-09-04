'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlices';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationLink, setVerificationLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      // Request ke API register
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      const { emailVerifyToken, user } = response.data;

      // Simpan user di Redux store tanpa password
      dispatch(loginSuccess({ token: '', user: { name: user.name, email: user.email, id: user.id } }));

      toast.success('Registration successful! Check your email for verification.');

      // Set verification link jika ada dari backend
      const link = `http://localhost:3000/verify-email?token=${emailVerifyToken}`;
      setVerificationLink(link);

    } catch (error: any) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Registration failed: ${error.response.data.message}`);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaUser className="text-gray-400 mr-2" />
              <input type="text" id="name" className="w-full p-2 focus:outline-none" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" id="email" className="w-full p-2 focus:outline-none" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" id="password" className="w-full p-2 focus:outline-none" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit" className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition ${loading ? 'opacity-50' : ''}`} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {verificationLink && (
          <div className="mt-4 text-center">
            <p>Check your email or</p>
            <a href={verificationLink} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Click here to verify your email</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
