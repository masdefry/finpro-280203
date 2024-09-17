'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import { loginSuccess } from '../../redux/slices/authSlices';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';  

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      setLoading(true); 
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
  
      const { token, user } = response.data;
      console.log("Login response:", response.data); 
  
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
  
      
      dispatch(loginSuccess({ token, user }));
  
      toast.success('Login successful!');
      router.push('/');
  
      setLoading(false); 
    } catch (error: any) {
      setLoading(false); 
      console.log("Error during login:", error); 
      
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <ToastContainer />
      <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">Login to Your Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg p-3 bg-gray-700 text-white">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="email"
                id="email"
                className="w-full bg-transparent outline-none border-none text-white placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg p-3 bg-gray-700 text-white">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                id="password"
                className="w-full bg-transparent outline-none border-none text-white placeholder-gray-400"
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
