'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlices'; 
import { RootState } from '../redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { FaGamepad, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

export const Header = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter(); // Use Next.js router for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);

      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setCurrentUser(parsedUser);
          } else {
            console.warn('User data in localStorage is invalid');
            setCurrentUser(user);
          }
        } catch (e) {
          console.error('Failed to parse user from localStorage:', e);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(user);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [token, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/login'); // Redirect to the login page after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <FaGamepad className="text-yellow-400" />
          <span>Gamer's Haven</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link href="/features" className="hover:text-yellow-400 transition">
            Features
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button className="focus:outline-none">
            <FaBars className="text-white w-6 h-6" />
          </button>
        </div>

        {/* User Section */}
        {isLoggedIn ? (
          <div className="relative inline-block">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUser className="text-white w-5 h-5" />
              <span>{currentUser?.name || currentUser?.email}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-black z-50">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
                  <FaUser className="inline-block mr-2" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4 hidden md:flex">
            <Link href="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>
            <Link href="/register" className="hover:text-yellow-400 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
