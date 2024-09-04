'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlices'; 
import { RootState } from '../redux/store';
import Link from 'next/link'; 

export const Header = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);

      const savedUser = localStorage.getItem('user');

      // Pastikan savedUser tidak null atau undefined
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        try {
          const parsedUser = JSON.parse(savedUser);
          
          if (parsedUser && typeof parsedUser === 'object') {
            setCurrentUser(parsedUser); // Data valid dari localStorage
          } else {
            console.warn('User data in localStorage is invalid');
            setCurrentUser(user);  // Fallback ke user dari Redux
          }
        } catch (e) {
          console.error('Failed to parse user from localStorage:', e);
          setCurrentUser(user);  // Fallback ke user dari Redux jika parsing gagal
        }
      } else {
        setCurrentUser(user);  // Gunakan user dari Redux jika tidak ada user di localStorage
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [token, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
  };

  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">Invoice Management App</div>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/features" className="hover:underline">
            Features
          </Link>

          {isLoggedIn ? (
            <>
              <span>Welcome, {currentUser?.name || currentUser?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
