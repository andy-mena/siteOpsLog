import type React from 'react';
import { MdOutlineRemoveRedEye, MdOutlineEdit, MdOutlineDelete, MdOutlineFileDownload } from "react-icons/md";
import Spinner from '../ui/Spinner';
import { TablePagination } from '../ui/TablePagination'; // Ajusta tu ruta
import { useWorkReports } from '../../hooks/useWorkReports'; // Ajusta tu ruta

export const WorkReportsTable: React.FC = () => {
  // 1. Consumimos toda la lógica de nuestro hook
  const { 
    currentReports, 
    isLoading, 
    totalReports, 
    pagination, 
    formatDate,
    exportToExcel
  } = useWorkReports();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 2. 👇 Modificamos este header para incluir el botón */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Reportes Recientes</h2>
        
        {/* Mostramos el botón solo si hay reportes que descargar */}
        {totalReports > 0 && (
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors shadow-sm cursor-pointer"
          >
            <MdOutlineFileDownload className="text-xl" />
            Exportar Excel
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-t-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          
          <thead className="bg-surface text-primary border-b border-gray-200 text-xs uppercase font-semibold">
            <tr>
              <th className='px-4 py-4 whitespace-nowrap'>Reporte</th>
              <th className="px-4 py-4">Sitio</th>
              <th className="px-4 py-4 whitespace-nowrap">INC / CHG</th>
              <th className="px-4 py-4">Trabajo Realizado</th>
              <th className="px-4 py-4 whitespace-nowrap">Fecha</th>
              <th className='px-4 py-4 whitespace-nowrap text-center'>Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentReports.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No hay reportes registrados aún.
                </td>
              </tr>
            ) : (
              currentReports.map((report) => (
                <tr key={report._id} className="hover:bg-slate-50 transition-colors">
                  <td className='px-4 py-3 whitespace-nowrap font-medium text-slate-700'>
                    {report.reportedBy.name} {report.reportedBy.lastname}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-primary">{report.site.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">ID: {report.site.siteId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                      {report.incChg}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{report.workDone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                    {formatDate(report.createdAt)}
                  </td>
                  <td className='px-4 py-3 text-slate-400'>
                    <div className='flex items-center justify-center gap-x-3'>
                      <button title="Ver detalles" className="hover:text-primary transition-colors">
                        <MdOutlineRemoveRedEye className='text-xl' />
                      </button>
                      <button title="Editar" className="hover:text-blue-500 transition-colors">
                        <MdOutlineEdit className='text-xl' />
                      </button>
                      <button title="Eliminar" className="hover:text-red-500 transition-colors">
                        <MdOutlineDelete className='text-xl' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 2. Inyectamos nuestro componente de paginación limpio */}
      <TablePagination 
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        totalItems={totalReports}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onNext={pagination.goToNextPage}
        onPrev={pagination.goToPreviousPage}
      />
    </div>
  );
};