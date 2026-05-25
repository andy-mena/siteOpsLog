import { useQuery } from "@tanstack/react-query";
import { getSites } from "../api/sites.api";
import { useState, useMemo } from "react";

function useSites() {
    const [searchTerm, setSearchTerm] = useState(""); // Estado de búsqueda
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data, isLoading } = useQuery({
        queryKey: ['sites'],
        queryFn: getSites,
        retry: false,
        refetchOnWindowFocus: false
    });

    const sites = data || [];

    // 2. Filtramos dinámicamente los sitios ANTES de paginarlos
    const filteredSites = useMemo(() => {
        if (!searchTerm) return sites;
        
        const lowerCaseTerm = searchTerm.toLowerCase();
        return sites.filter(site => 
            site.siteId.toLowerCase().includes(lowerCaseTerm) || 
            site.name.toLowerCase().includes(lowerCaseTerm)
        );
    }, [sites, searchTerm]);

    // 3. Matemáticas de paginación (ahora usamos filteredSites)
    const totalPages = Math.ceil(filteredSites.length / itemsPerPage) || 1; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 4. Memorizamos el corte
    const currentSites = useMemo(() => {
        return filteredSites.slice(startIndex, endIndex);
    }, [filteredSites, startIndex, endIndex]);

    // 5. Función especial para buscar (resetea la página a 1)
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1); // ¡Vital para no quedar atrapado en páginas vacías!
    };

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return {
        currentSites,
        isLoading,
        searchTerm,        
        handleSearch,      
        totalSites: filteredSites.length, // Total de la búsqueda actual
        pagination: {
            currentPage,
            totalPages,
            startIndex,
            endIndex: Math.min(endIndex, filteredSites.length),
            goToNextPage,
            goToPreviousPage
        }
    };
}

export default useSites;