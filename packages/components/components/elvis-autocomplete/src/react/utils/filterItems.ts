import { AutocompleteItem } from '../elvia-autocomplete.types';

export const filterItems = (
  items: AutocompleteItem[],
  filter: string | null | undefined,
  limit = 6,
): AutocompleteItem[] => {
  if (!filter) {
    return items.slice(0, limit);
  }

  const normalizedFilter = filter.toLowerCase().trim();

  const filteredItems = items
    .filter(({ label }) => label.toLowerCase().includes(normalizedFilter))
    .slice(0, limit);

  return filteredItems;
};
