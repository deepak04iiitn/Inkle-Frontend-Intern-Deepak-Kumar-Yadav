'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getTaxes, updateTax } from '../../services/api';
import EditModal from '../../components/EditModal';
import { Funnel, SquarePen } from 'lucide-react';

export default function Table() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [countryFilter, setCountryFilter] = useState([]);
  const [isCountryFilterOpen, setIsCountryFilterOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const taxes = await getTaxes();
      setData(taxes);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (row) => {
    setSelectedCustomer(row.original);
    setEditModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const dataToUpdate = {
        ...selectedCustomer,
        ...updatedData,
      };
      await updateTax(updatedData.id, dataToUpdate);
      await loadData();
    } catch (error) {
      throw error;
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'entity',
        header: 'Entity',
        cell: (info) => {
          const value = info.getValue() || info.row.original.name || info.row.original.entity || 'N/A';
          return (
            <span className="text-purple-600 font-medium">
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        cell: (info) => {
          const gender = info.getValue() || info.row.original.gender;
          if (!gender) return 'N/A';
          const isMale = gender.toLowerCase() === 'male';
          return (
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                isMale
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {gender}
            </span>
          );
        },
      },
      {
        accessorKey: 'requestDate',
        header: 'Request date',
        cell: (info) => {
          const date = info.getValue() || info.row.original.request_date || info.row.original['request date'];
          if (!date) return 'N/A';
          try {
            const dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) return date;
            return dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          } catch {
            return date;
          }
        },
      },
      {
        accessorKey: 'country',
        header: 'Country',
        cell: (info) => {
          const value = info.getValue() || info.row.original.country || 'N/A';
          return <span>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: '',
        cell: (info) => (
          <button
            onClick={() => handleEdit(info.row)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SquarePen size={16} color="#919191" />
          </button>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if(countryFilter.length === 0) return data;
    return data.filter((item) => countryFilter.includes(item.country));
  }, [data, countryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const uniqueCountries = useMemo(() => {
    const countries = data
      .map((item) => item.country)
      .filter((country) => country);
    return [...new Set(countries)].sort();
  }, [data]);

  const handleCountryFilterToggle = (country) => {
    setCountryFilter((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(isCountryFilterOpen && !event.target.closest('.country-filter-container')) {
        setIsCountryFilterOpen(false);
      }
    };

    if(isCountryFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCountryFilterOpen]);

  if(isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (

                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm text-gray-500 whitespace-nowrap cursor-pointer"
                    >
                      {header.id === 'country' ? (
                        <div className="relative country-filter-container">
                          <div className="flex items-center gap-18">
                            <span>Country</span>
                            <button
                              onClick={() => setIsCountryFilterOpen(!isCountryFilterOpen)}
                              className={`text-purple-600 hover:text-purple-700 ${
                                countryFilter.length > 0 ? 'text-purple-700' : ''
                              }`}
                            >
                              <Funnel size={16} color="#0b45f4" />
                            </button>
                          </div>

                          {isCountryFilterOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">

                              {uniqueCountries.map((country) => (
                                <label
                                  key={country}
                                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={countryFilter.includes(country)}
                                    onChange={() =>
                                      handleCountryFilterToggle(country)
                                    }
                                    className="mr-2"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {country}
                                  </span>
                                </label>
                              ))}

                            </div>
                          )}

                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </th>
                  ))}
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
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onSave={handleSave}
      />

    </div>
  );
}
