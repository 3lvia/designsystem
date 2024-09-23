import { useLanguage } from '@elvia/elvis-toolbox';

export const getStatusForScreenReader = (numberOfSuggestions: number): string => {
  const lang = useLanguage();
  switch (numberOfSuggestions) {
    case 0:
      return lang === 'no' ? 'Ingen forslag.' : 'No suggestions';
    case 1:
      return lang === 'no' ? 'Ett forslag.' : 'One suggestion.';
    default:
      return lang === 'no' ? `${numberOfSuggestions} forslag.` : `${numberOfSuggestions} suggestions.`;
  }
};
