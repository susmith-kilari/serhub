import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import Logo from './Logo';

interface HeaderProps {
  isLoggedIn: boolean;
  user?: User;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogout: () => void;
  onMyBookingsClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onLoginClick, onSignupClick, onLogout, onMyBookingsClick, showBackButton, onBackClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 ring-1 ring-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
               <button onClick={onBackClick} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" aria-label="Go back">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              </button>
            )}
            <Logo />
          </div>
          <div className="flex items-center space-x-6">
            {isLoggedIn && user ? (
              <>
                 <a href="#" className="text-sm font-medium text-gray-300 hover:text-teal-400 hidden sm:block">Terms & Conditions</a>
                 <div className="relative" ref={profileRef}>
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center justify-center h-10 w-10 bg-gray-700 rounded-full text-teal-400 font-bold text-lg ring-2 ring-gray-600 hover:ring-teal-500 transition-all" aria-label="Open user menu">
                       {user.name.charAt(0).toUpperCase()}
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50 border border-gray-700">
                            <div className="px-4 py-3 border-b border-gray-700">
                                <p className="text-sm font-semibold text-white" role="none">{user.name}</p>
                                <p className="text-sm text-gray-400" role="none">{user.mobile}</p>
                            </div>
                            <div className="py-1">
                                <button onClick={() => { onMyBookingsClick?.(); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" role="menuitem">My Bookings</button>
                                <a href="#" className="block sm:hidden px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" role="menuitem">Terms & Conditions</a>
                            </div>
                            <div className="py-1 border-t border-gray-700">
                                <button onClick={() => { onLogout(); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300" role="menuitem">Logout</button>
                            </div>
                        </div>
                    )}
                 </div>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-sm font-medium text-gray-300 hover:text-teal-400"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
