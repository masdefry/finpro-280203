'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { loginSuccess } from '../../redux/slices/authSlices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    phone: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || '', 
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { phone, address } = formData;

    if (!phone || !address) {
      toast.error('Phone and address are required');
      return;
    }

    try {
      setLoading(true);

      if (!token) {
        toast.error('Unauthorized: No token found');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        'http://localhost:8000/api/auth/update-profile',
        { phone, address },
        { headers }
      );

      // Update Redux store with new profile data
      dispatch(loginSuccess({ token, user: { ...user, ...response.data.user } }));
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`Failed to update profile: ${error.message || 'Server error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transform transition-transform hover:scale-105 duration-300">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <FaUser className="text-gray-600 text-6xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-700">{user?.name || 'User'}</h2>
          <p className="text-gray-500">{user?.email || 'example@example.com'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Field */}
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
            <FaPhone className="text-gray-600" />
            <input
              type="text"
              id="phone"
              className="w-full bg-transparent outline-none border-none text-gray-600 focus:ring-2 focus:ring-indigo-500"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address Field */}
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-gray-600" />
            <input
              type="text"
              id="address"
              className="w-full bg-transparent outline-none border-none text-gray-600 focus:ring-2 focus:ring-indigo-500"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className={`w-full flex items-center justify-center bg-yellow-600 text-white font-bold py-3 rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            <FaSave className="mr-2" />
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
