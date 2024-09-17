'use client';

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlices'; 
import { RootState } from '../redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaFeatherAlt, FaUser, FaSignOutAlt, FaBars, FaFileInvoice, FaUserCircle, FaAddressBook } from 'react-icons/fa';

export const Header = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown

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
            setCurrentUser(user);
          }
        } catch (e) {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(user);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [token, user]);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 text-3xl font-bold tracking-wide">
          <FaFeatherAlt className="text-yellow-400 w-8 h-8" />
          <span className="text-white text-4xl">Finquill</span>
        </div>

        {/* Navigation Links */}
        <nav className={`md:flex space-x-8 ${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link href="/" className="hover:text-yellow-400 transition text-lg" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition text-lg" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/invoice" className="hover:text-yellow-400 transition text-lg" onClick={() => setMobileMenuOpen(false)}>
            Invoice
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button className="focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FaBars className="text-white w-6 h-6" />
          </button>
        </div>

        {/* User Section */}
        {isLoggedIn ? (
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none hover:text-yellow-400 transition"
            >
              <FaUserCircle className="text-white w-8 h-8" />
              <span className="text-lg">{currentUser?.name || currentUser?.email}</span>
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
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>
                  <FaUser className="inline-block mr-2" /> Profile
                </Link>
                <Link href="/invoice" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>
                  <FaFileInvoice className="inline-block mr-2" /> Invoices
                </Link>
                <Link href="/client-list" className="block px-4 py-2 hover:bg-gray-200" onClick={closeDropdown}>
                  <FaAddressBook className="inline-block mr-2" /> Client List
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex space-x-6">
            <Link href="/login" className="hover:text-yellow-400 transition text-lg">
              Login
            </Link>
            <Link href="/register" className="hover:text-yellow-400 transition text-lg">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
