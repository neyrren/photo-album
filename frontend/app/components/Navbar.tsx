'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { removeAuthToken } from '@/app/utils/auth';
import { useState } from 'react';

interface NavbarProps {
  userName?: string;
}

const Navbar: FC<NavbarProps> = ({ userName }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-primary sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/albums" className="flex items-center space-x-2">
            <div className="text-2xl">📸</div>
            <span className="text-white font-bold text-xl hidden sm:block">
              PhotoAlbum
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {userName && (
              <span className="text-white text-sm">
                Welcome, <span className="font-semibold">{userName}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white border-opacity-20 py-4 space-y-4">
            {userName && (
              <p className="text-white text-sm px-4">
                Welcome, <span className="font-semibold">{userName}</span>
              </p>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;