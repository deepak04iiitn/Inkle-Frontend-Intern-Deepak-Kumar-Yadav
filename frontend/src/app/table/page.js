'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { getTaxes, updateTax } from '../../services/api';
import EditModal from '../../components/table/EditModal';
import SearchBar from '../../components/table/SearchBar';
import DataTable from '../../components/table/DataTable';
import TablePagination from '../../components/table/TablePagination';
import { createColumns } from '../../components/table/tableColumns';
import { Loader2 } from 'lucide-react';

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

  const columns = useMemo(() => createColumns(handleEdit), []);

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto pt-4">
        
        <SearchBar
          value={globalFilter}
          onChange={setGlobalFilter}
          onClear={() => setGlobalFilter('')}
        />

        <DataTable
          table={table}
          columns={columns}
          countryFilter={countryFilter}
          isCountryFilterOpen={isCountryFilterOpen}
          setIsCountryFilterOpen={setIsCountryFilterOpen}
          uniqueCountries={uniqueCountries}
          handleCountryFilterToggle={handleCountryFilterToggle}
        />

        <TablePagination
          table={table}
          filteredData={filteredData}
          data={data}
          globalFilter={globalFilter}
        />
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
