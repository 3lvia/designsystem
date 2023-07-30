import { AutocompleteItem } from '../elvia-autocomplete.types';

const calculateItemRelevance = (itemLabel: string, filter: string[]): number => {
  const normalizedItemLabel = itemLabel.toLowerCase();

  let relevance = 0;
  for (const filterItem of filter) {
    const normalizedFilterItem = filterItem.toLowerCase();

    // Higher relevance for exact matches, then starts with, then includes
    if (normalizedItemLabel === normalizedFilterItem) {
      relevance += 3;
    }
    if (normalizedItemLabel.startsWith(normalizedFilterItem)) {
      relevance += 2;
    }
    if (normalizedItemLabel.includes(normalizedFilterItem)) {
      relevance += 1;
    }
  }
  return relevance;
};

export const filterItems = (
  items: AutocompleteItem[],
  filter: string | null | undefined,
  limit = 6,
): AutocompleteItem[] | [] => {
  if (!filter) {
    return items.slice(0, limit);
  }

  const normalizedFilter: string[] = filter.toLowerCase().trim().split(/\s+/);

  const scoredItems = items
    .filter((item) => normalizedFilter.some((filterWord) => item.label.toLowerCase().includes(filterWord)))
    .map((item) => ({
      item,
      relevance: calculateItemRelevance(item.label, normalizedFilter),
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map((scoredItem) => scoredItem.item);

  console.log(scoredItems);
  return scoredItems;
};
