'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export default function TablePagination({ table, filteredData, data, globalFilter }) {
  return (
    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">

        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <span className="text-sm text-gray-700 whitespace-nowrap">
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
          className="cursor-pointer px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
        >
          {[5, 10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-700 text-center sm:text-left">
        Showing <strong>{table.getRowModel().rows.length}</strong> of{' '}
        <strong>{filteredData.length}</strong> results
        {globalFilter && (
          <span className="ml-2 text-purple-600">
            (filtered from {data.length} total)
          </span>
        )}
      </div>
      
    </div>
  );
}

