'use client';

import React, { useState, useEffect } from 'react';
import { getCountries } from '../services/api';
import { ChevronDown, MapPin, Pencil, X } from 'lucide-react';

export default function EditModal({ isOpen, onClose, customer, onSave }) {

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isOpen && customer) {
      setName(customer.name || customer.entity || '');
      setCountry(customer.country || '');
      setIsDropdownOpen(false);
    }
  }, [isOpen, customer]);

  useEffect(() => {
    if(isOpen) {
      loadCountries();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(isDropdownOpen && !event.target.closest('.country-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if(isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const loadCountries = async () => {
    try {
      const data = await getCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const handleSave = async () => {
    if(!name.trim()) {
      alert('Name is required');
      return;
    }

    setIsLoading(true);

    try {
      await onSave({
        ...customer,
        name: name.trim(),
        country: country,
      });
      onClose();

    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setIsDropdownOpen(false);
  };

  if(!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-md"
      onClick={(e) => {
        if(e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-[560px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 gap-4">
          <h2 className="text-2xl font-bold #110733">Edit Customer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold cursor-pointer"
          >
            <X size={16} color="#110733" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[#FAFAFB] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter name"
            />
          </div>

          <div className="relative country-dropdown-container mb-60">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Country
            </label>

            <div className="relative">
              <input
                type="text"
                value={country}
                readOnly
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className= "w-full px-4 py-2 bg-[#FAFAFB] border rounded-lg focus:outline-none cursor-pointer border-gray-200"
                placeholder="Select country"
              />

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Pencil size={12.5} color="#706A85" />
                <ChevronDown size={16} color="#706A85" />
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {countries.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Loading countries...</div>
                ) : (
                  countries.map((countryItem, index) => {
                    const countryName = typeof countryItem === 'string' 
                      ? countryItem 
                      : (countryItem.name || countryItem.country || 'Unknown');
                    const countryId = countryItem.id || countryItem.code || index;
                    
                    return (
                      <div
                        key={countryId}
                        onClick={() => handleCountrySelect(countryName)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin size={12.5} color="#B8B5C2" />
                          <span className="text-gray-700">
                            {countryName}
                          </span>
                        </div>
                        <Pencil size={12.5} color="#5622FF" />
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !name.trim()}
            className="px-6 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

