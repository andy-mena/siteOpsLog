import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as XLSX from "xlsx"
import { getAllReports } from '../api/report.api';

export function useWorkReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Obtenemos la data
  const { data, isLoading } = useQuery({
    queryKey: ["workReports"],
    queryFn: getAllReports,
    retry: false,
  });

  const reports = data || [];

  // 2. Matemáticas de paginación
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 3. Memorizamos el corte del arreglo para mejor rendimiento
  const currentReports = useMemo(() => {
    return reports.slice(startIndex, endIndex);
  }, [reports, startIndex, endIndex]);

  // 4. Funciones de control
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 5. Utilidades
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const exportToExcel = () => {
    if (reports.length === 0) return;

    // A. Mapeamos los datos para que las columnas tengan nombres bonitos en español
    const excelData = reports.map((report) => ({
      "Técnico": `${report.reportedBy.name} ${report.reportedBy.lastname}`,
      "Nombre del Sitio": report.site.name,
      "ID del Sitio": report.site.siteId,
      "Ticket (INC/CHG)": report.incChg,
      "Trabajo Realizado": report.workDone,
      "Resumen del Trabajo": report.workSummary, // En excel sí es útil ver todo el texto
      "Fecha de Creación": formatDate(report.createdAt)
    }));

    // B. Creamos la hoja de cálculo y el libro
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    // C. Ajustamos el ancho de las columnas (opcional pero se ve más pro)
    worksheet['!cols'] = [
      { wch: 20 }, // Técnico
      { wch: 25 }, // Nombre Sitio
      { wch: 15 }, // ID Sitio
      { wch: 15 }, // Ticket
      { wch: 30 }, // Trabajo
      { wch: 50 }, // Resumen
      { wch: 20 }, // Fecha
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");

    // D. Descargamos el archivo (Genera un archivo como "Reportes_Operaciones_1716310779000.xlsx")
    XLSX.writeFile(workbook, `Reportes_Operaciones_${Date.now()}.xlsx`);
  }

  // 6. Exportamos solo lo que la vista necesita saber
  return {
    currentReports,
    isLoading,
    totalReports: reports.length,
    pagination: {
      currentPage,
      totalPages,
      startIndex,
      endIndex: Math.min(endIndex, reports.length),
      goToNextPage,
      goToPreviousPage
    },
    formatDate,
    exportToExcel
  };
}