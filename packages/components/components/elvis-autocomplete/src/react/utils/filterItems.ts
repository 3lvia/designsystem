import { AutocompleteItem } from '../elvia-autocomplete.types';

let previousFilteredItems: AutocompleteItem[] = [];

export const filterItems = (
  items: AutocompleteItem[],
  filter: string | null | undefined,
  limit = 6,
): AutocompleteItem[] => {
  if (!filter) {
    return previousFilteredItems;
  }

  const normalizedFilter = filter.toLowerCase().trim();

  const scoredItems = items
    .filter(({ label }) => label.toLowerCase().includes(normalizedFilter))
    .slice(0, limit);

  previousFilteredItems = scoredItems;

  return scoredItems;
};
