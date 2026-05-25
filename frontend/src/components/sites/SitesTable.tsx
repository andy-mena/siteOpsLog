import { MdSearch } from "react-icons/md"; // 👈 Importamos la lupa
import { TablePagination } from "../ui/TablePagination"
import Spinner from "../ui/Spinner"
import useSites from "../../hooks/useSites"
import { WazeActionCell } from "../ui/WazeActionCell";

function SitesTable() {
  const {
    currentSites,
    isLoading,
    pagination,
    totalSites,
    searchTerm, 
    handleSearch 
  } = useSites()

  if (isLoading) {
    return (
      <div className="flex justify-center w-full py-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* HEADER DE LA TABLA */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary">Sitios Operativos</h2>
        
        {/* Input de Búsqueda Intuitivo */}
        <div className="relative w-full sm:w-72">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Buscar por ID o Nombre..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-t-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-surface text-primary border-b border-gray-200 text-xs uppercase font-semibold">
            <tr>
              <th className="px-4 py-4">Sitio</th>
              <th className="px-4 py-4">Latitud</th>
              <th className="px-4 py-4">Longitud</th>
              <th className='px-4 py-4'>Enlaces</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentSites.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center">
                  {/* Mensaje dinámico si buscó algo y no lo encontró */}
                  {searchTerm ? (
                    <span className="text-gray-500">
                      No se encontraron sitios que coincidan con "<span className="font-semibold">{searchTerm}</span>".
                    </span>
                  ) : (
                    <span className="text-gray-500">No hay sitios registrados aún.</span>
                  )}
                </td>
              </tr>
            ) : (
              currentSites.map((site) => (
                <tr key={site._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-primary">{site.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">ID: {site.siteId}</div>
                  </td>
                  <td className="px-4 py-3 font-medium">{site.latitude}</td>
                  <td className="px-4 py-3 font-medium">{site.longitude}</td>
                  <td className="px-4 py-3">
                    {site.wazeLink ? (
                      <WazeActionCell link={site.wazeLink} key={site.wazeLink} />
                    ) : (
                      <span className="text-xs text-slate-400">Sin enlace</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        totalItems={totalSites}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onNext={pagination.goToNextPage}
        onPrev={pagination.goToPreviousPage}
      />
    </div>
  )
}

export default SitesTable;