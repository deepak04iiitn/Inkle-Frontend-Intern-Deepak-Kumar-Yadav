import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SquarePen } from 'lucide-react';

export const createColumns = (handleEdit) => [
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
      const value = info.getValue() || 'N/A';
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
      const gender = info.getValue();
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
      const date = info.getValue();
      if(!date) return 'N/A';

      try {
        let dateObj;

        if(typeof date === 'string') {

          const ddmmyyMatch = date.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})$/);

          if(ddmmyyMatch) {
            const [, day, month, year] = ddmmyyMatch;
            const fullYear = year.length === 2 ? `20${year}` : year;
            dateObj = new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
          } else {
            dateObj = new Date(date);
          }
        } else {
          dateObj = new Date(date);
        }

        if(isNaN(dateObj.getTime())) {

          const parts = String(date).split(/[-/]/);

          if(parts.length === 3) {
            const [first, second, third] = parts;

            if(first.length <= 2 && second.length <= 2) {
              const day = first.padStart(2, '0');
              const month = second.padStart(2, '0');
              const year = third.length === 2 ? `20${third}` : third;
              dateObj = new Date(`${year}-${month}-${day}`);
            } else {
              dateObj = new Date(date);
            }
          } else {
            return date;
          }
        }

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
      const dateA = rowA.original.requestDate;
      const dateB = rowB.original.requestDate;
      if(!dateA) return 1;
      if(!dateB) return -1;
      return new Date(dateA) - new Date(dateB);
    },
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: (info) => {
      const value = info.getValue() || 'N/A';
      return <span>{value}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Edit',
    enableSorting: false,
    cell: (info) => (
      <button
        onClick={() => handleEdit(info.row)}
        className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
      >
        <SquarePen size={16} color="#919191" />
      </button>
    ),
  },
];

