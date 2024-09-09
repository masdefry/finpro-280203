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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">Create Your Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="name">Name</label>
            <div className="flex items-center border rounded-lg p-3 bg-gray-700 text-white">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                id="name"
                className="w-full bg-transparent outline-none border-none"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="email">Email</label>
            <div className="flex items-center border rounded-lg p-3 bg-gray-700 text-white">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                id="email"
                className="w-full bg-transparent outline-none border-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="password">Password</label>
            <div className="flex items-center border rounded-lg p-3 bg-gray-700 text-white">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                id="password"
                className="w-full bg-transparent outline-none border-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-yellow-600 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {verificationLink && (
          <div className="mt-4 text-center">
            <a href={verificationLink} className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">Click here to verify your email</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
