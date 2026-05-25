export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

