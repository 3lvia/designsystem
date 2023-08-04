export const getStatusForScreenReader = (numberOfSuggestions: number): string => {
  switch (numberOfSuggestions) {
    case 0:
      return 'Ingen forslag.';
    case 1:
      return 'Ett forslag.';
    default:
      return `${numberOfSuggestions} forslag.`;
  }
};
