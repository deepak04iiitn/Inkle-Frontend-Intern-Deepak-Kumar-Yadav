'use client';

import React from 'react';
import { flexRender } from '@tanstack/react-table';
import CountryFilter from './CountryFilter';

export default function DataTable({
  table,
  columns,
  countryFilter,
  isCountryFilterOpen,
  setIsCountryFilterOpen,
  uniqueCountries,
  handleCountryFilterToggle,
}) {

  const getPaddingClass = (columnId) => {
    if(columnId === 'entity') {
      return 'pl-6 pr-2';
    } else if (columnId === 'gender') {
      return 'pl-2 pr-6';
    } else if (columnId === 'requestDate') {
      return 'pl-6 pr-2';
    } else if (columnId === 'country') {
      return 'pl-2 pr-0';
    } else if (columnId === 'actions') {
      return 'pl-0 pr-6';
    }
    return 'px-6';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">

          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (

              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const paddingClass = getPaddingClass(header.id);

                  return (
                    <th
                      key={header.id}
                      className={`${paddingClass} py-3 sm:py-4 text-left text-xs sm:text-sm text-gray-500 whitespace-nowrap cursor-pointer`}
                    >
                      {header.id === 'country' ? (
                        <CountryFilter
                          isOpen={isCountryFilterOpen}
                          onToggle={() => setIsCountryFilterOpen(!isCountryFilterOpen)}
                          countries={uniqueCountries}
                          selectedCountries={countryFilter}
                          onToggleCountry={handleCountryFilterToggle}
                        />
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>

            ))}
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => {
                    const paddingClass = getPaddingClass(cell.column.id);

                    return (
                      <td
                        key={cell.id}
                        className={`${paddingClass} py-3 sm:py-4 text-xs sm:text-sm text-gray-700`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

