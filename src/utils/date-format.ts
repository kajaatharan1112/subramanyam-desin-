export const formatDateDisplay = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    // Invalid date check
    if (isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('en-LK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};
