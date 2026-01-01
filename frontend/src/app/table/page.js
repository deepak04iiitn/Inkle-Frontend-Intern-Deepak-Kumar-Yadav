'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getTaxes, updateTax } from '../../services/api';
import EditModal from '../../components/EditModal';
import { Funnel, SquarePen, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function Table() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [countryFilter, setCountryFilter] = useState([]);
  const [isCountryFilterOpen, setIsCountryFilterOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

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
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-2 hover:text-purple-600 transition-colors"
            >
              Entity
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
          );
        },
        cell: (info) => {
          const value = info.getValue() || info.row.original.name || info.row.original.entity || 'N/A';
          return (
            <span className="text-purple-600 font-medium">
              {value}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: 'gender',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-2 hover:text-purple-600 transition-colors"
            >
              Gender
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
          );
        },
        cell: (info) => {
          const gender = info.getValue() || info.row.original.gender;
          if(!gender) return 'N/A';

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
        enableSorting: true,
      },
      {
        accessorKey: 'requestDate',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-2 hover:text-purple-600 transition-colors"
            >
              Request date
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
          );
        },
        cell: (info) => {
          const date = info.getValue() || info.row.original.request_date || info.row.original['request date'];
          if(!date) return 'N/A';

          try {
            const dateObj = new Date(date);
            if(isNaN(dateObj.getTime())) return date;
            return dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          } catch {
            return date;
          }
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const dateA = rowA.original.requestDate || rowA.original.request_date || rowA.original['request date'];
          const dateB = rowB.original.requestDate || rowB.original.request_date || rowB.original['request date'];
          if(!dateA) return 1;
          if(!dateB) return -1;
          return new Date(dateA) - new Date(dateB);
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
        enableSorting: false,
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

    let filtered = data;
    
    if(countryFilter.length > 0) {
      filtered = filtered.filter((item) => countryFilter.includes(item.country));
    }
    
    if(globalFilter) {

      const searchLower = globalFilter.toLowerCase();
      filtered = filtered.filter((item) => {
        const entity = (item.entity || item.name || '').toLowerCase();
        const gender = (item.gender || '').toLowerCase();
        const country = (item.country || '').toLowerCase();
        const date = (item.requestDate || item.request_date || item['request date'] || '').toString().toLowerCase();
        
        return (
          entity.includes(searchLower) ||
          gender.includes(searchLower) ||
          country.includes(searchLower) ||
          date.includes(searchLower)
        );
      });

    }
    
    return filtered;
  }, [data, countryFilter, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
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
      <div className="max-w-7xl mx-auto pt-4">

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by entity, gender, country, or date..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            {globalFilter && (
              <button
                onClick={() => setGlobalFilter('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

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
                          <div className="flex items-center gap-2">
                            <span>Country</span>
                            <button
                              onClick={() => setIsCountryFilterOpen(!isCountryFilterOpen)}
                              className={`text-purple-600 hover:text-purple-700 transition-colors ${
                                countryFilter.length > 0 ? 'text-purple-700' : ''
                              }`}
                            >
                              <Funnel className="w-4 h-4" />
                            </button>
                            {countryFilter.length > 0 && (
                              <span className="ml-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                {countryFilter.length}
                              </span>
                            )}
                          </div>

                          {isCountryFilterOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px] max-h-60 overflow-auto">
                              {uniqueCountries.length === 0 ? (
                                <div className="px-4 py-2 text-sm text-gray-500">No countries available</div>
                              ) : (
                                <>
                                  <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Filter by Country</span>
                                    {countryFilter.length > 0 && (
                                      <button
                                        onClick={() => setCountryFilter([])}
                                        className="text-xs text-purple-600 hover:text-purple-700"
                                      >
                                        Clear all
                                      </button>
                                    )}
                                  </div>
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
                                </>
                              )}
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


        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Page{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>

            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {[5, 10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-700">
            Showing <strong>{table.getRowModel().rows.length}</strong> of{' '}
            <strong>{filteredData.length}</strong> results
            {globalFilter && (
              <span className="ml-2 text-purple-600">
                (filtered from {data.length} total)
              </span>
            )}
          </div>

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
