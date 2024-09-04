'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; // Menggunakan useRouter dari next/navigation
import { loginSuccess } from '../../redux/slices/authSlices';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';  // Import axios

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Deklarasi useRouter untuk navigasi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State untuk loading indicator

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      setLoading(true); // Mulai loading
      // Pastikan menggunakan URL yang benar sesuai dengan port backend
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
  
      const { token, user } = response.data;
      console.log("Login response:", response.data); // Cek respons untuk memverifikasi apakah user dan token sudah benar
  
      // Simpan token dan user di localStorage agar tetap terautentikasi setelah refresh
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Simpan user sebagai string JSON
  
      // Dispatch login success ke Redux
      dispatch(loginSuccess({ token, user }));
  
      toast.success('Login successful!');
      router.push('/');
  
      setLoading(false); // Hentikan loading
    } catch (error: any) {
      setLoading(false); // Hentikan loading
      console.log("Error during login:", error); // Debugging error
      // Periksa error dari response server
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                className="w-full p-2 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                className="w-full p-2 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition ${loading ? 'opacity-50' : ''}`}
            disabled={loading} // Disable button ketika sedang loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
