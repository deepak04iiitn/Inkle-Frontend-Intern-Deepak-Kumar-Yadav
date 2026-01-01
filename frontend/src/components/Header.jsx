'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Bell, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                Inkle
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/table"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/table"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
            >
              Customers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/table"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
            >
              Analytics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                U
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-700">User</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/table"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2 hover:bg-purple-50 rounded-lg"
              >
                Dashboard
              </Link>

              <Link
                href="/table"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2 hover:bg-purple-50 rounded-lg"
              >
                Customers
              </Link>

              <Link
                href="/table"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 py-2 hover:bg-purple-50 rounded-lg"
              >
                Analytics
              </Link>

              <div className="flex items-center space-x-3 pt-2 border-t border-gray-200 px-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">User</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
