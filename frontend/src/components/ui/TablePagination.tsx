import type React from 'react';

interface TablePaginationProps {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  startIndex,
  endIndex,
  totalItems,
  currentPage,
  totalPages,
  onNext,
  onPrev,
}) => {
  if (totalItems === 0) return null;

  return (
    <div className="flex items-center justify-between border-x border-b border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg shadow-sm">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
          <span className="font-medium">{endIndex}</span> de{' '}
          <span className="font-medium">{totalItems}</span> resultados
        </p>
      </div>

      <div className="flex flex-1 justify-between sm:justify-end gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Anterior
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};