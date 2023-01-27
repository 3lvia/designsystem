/** Max page numbers that can be visible at the same time */
export const maxVisiblePageNumbers = 9;
export const maxVisiblePageNumbersMo = 7;
/** How many pages that should be displayed between the dots when there are dots on both sides */
export const numOfPagesBetweenDots = 5;
export const numOfPagesBetweenDotsMo = 3;

/** How many pages that can be displayed on each end before/after dots. 2 represents the space for the dots and the last or first number*/
export const numOfPagesBeforeDots = maxVisiblePageNumbers - 2;
export const numOfPagesBeforeDotsMo = maxVisiblePageNumbersMo - 2;
/** How many pages that should visible on each side of the selected page when in center (Dots are visible on both sides) */
export const numOfPagesBesideSelected = Math.floor(numOfPagesBetweenDots / 2);
export const numOfPagesBesideSelectedMo = Math.floor(numOfPagesBetweenDotsMo / 2);
/** How many pages that can be navigated to at each end before dots are displayed instead of numbers */
export const visibleDotsBreakingPoint = numOfPagesBeforeDots - numOfPagesBesideSelected;
export const visibleDotsBreakingPointMo = numOfPagesBeforeDotsMo - numOfPagesBesideSelectedMo;
