'use client';

import React from 'react';
import { Funnel } from 'lucide-react';

export default function CountryFilter({
  isOpen,
  onToggle,
  countries,
  selectedCountries,
  onToggleCountry,
}) {
  return (
    <div className="relative country-filter-container">
      <div className="flex items-center gap-10">

        <span>Country</span>
        <div className="flex items-center gap-1">
          {selectedCountries.length > 0 && (
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
              {selectedCountries.length}
            </span>
          )}
          <button
            onClick={onToggle}
            className={`text-purple-600 hover:text-purple-700 cursor-pointer transition-colors ${
              selectedCountries.length > 0 ? 'text-purple-700' : ''
            }`}
          >
            <Funnel className="w-4 h-4" />
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px] max-h-60 overflow-auto">
          {countries.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No countries available</div>
          ) : (
            <>
              {countries.map((country) => (
                <label
                  key={country}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country)}
                    onChange={() => onToggleCountry(country)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">{country}</span>
                </label>
              ))}
            </>
          )}
        </div>
      )}
      
    </div>
  );
}

