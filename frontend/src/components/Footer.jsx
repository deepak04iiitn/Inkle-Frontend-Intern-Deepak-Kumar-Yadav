'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">

            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                Inkle
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 max-w-md">
              Streamline your business operations with our powerful and intuitive
              customer management platform. Built for modern teams.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/table"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/table"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Customers
                </Link>
              </li>

              <li>
                <Link
                  href="/table"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Analytics
                </Link>
              </li>

              <li>
                <Link
                  href="/table"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Settings
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Documentation
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <p className="text-gray-600 text-sm">
              © {currentYear} Inkle. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
              >
                Terms of Service
              </Link>

              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 text-sm transition-colors"
              >
                Cookie Policy
              </Link>

            </div>

          </div>
        </div>
        
      </div>
    </footer>
  );
}
