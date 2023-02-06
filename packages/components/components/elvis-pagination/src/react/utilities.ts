import { VisibleElements } from './elvia-pagination.types';

/**
 * Returns the current range of the pagination based on the current page number, the number of elements and the dropdown value.
 */
export const getPaginationRange = (
  pageNumber: number,
  dropdownValue: number,
  numberOfElements: number,
): VisibleElements => {
  if (numberOfElements === 0) {
    return { start: 1, end: 1 };
  }
  const firstElementIndex = dropdownValue * pageNumber - dropdownValue + 1;
  const lastElementIndex = Math.min(firstElementIndex + dropdownValue - 1, numberOfElements);
  return {
    start: firstElementIndex,
    end: lastElementIndex,
  };
};
