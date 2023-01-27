import React, { FC, Dispatch, SetStateAction, useMemo } from 'react';
import {
  maxVisiblePageNumbers,
  maxVisiblePageNumbersMo,
  numOfPagesBeforeDots,
  numOfPagesBeforeDotsMo,
  numOfPagesBesideSelected,
  numOfPagesBesideSelectedMo,
  visibleDotsBreakingPoint,
  visibleDotsBreakingPointMo,
} from './constants';
import { PageElement } from './PageElement';

interface BetweenPageNumbersProps {
  numberOfPages: number;
  selectedPageNumber: number;
  isMobile: boolean;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}

export const BetweenPageNumbers: FC<BetweenPageNumbersProps> = ({
  numberOfPages,
  selectedPageNumber,
  isMobile,
  setSelectedPageNumber,
}) => {
  const allPageNumbersAreVisible = useMemo(() => {
    return numberOfPages === (isMobile ? maxVisiblePageNumbersMo : maxVisiblePageNumbers);
  }, [numberOfPages, isMobile]);

  const isNumberAtBeginningAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber <= (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      pageNumber <= (isMobile ? numOfPagesBeforeDotsMo : numOfPagesBeforeDots)
    );
  };

  const isNumberInCenterAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber > (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      selectedPageNumber <=
        numberOfPages - (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      pageNumber >= selectedPageNumber - (isMobile ? numOfPagesBesideSelectedMo : numOfPagesBesideSelected) &&
      pageNumber <= selectedPageNumber + (isMobile ? numOfPagesBesideSelectedMo : numOfPagesBesideSelected)
    );
  };

  const isNumberAtEndAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber >
        numberOfPages - (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      pageNumber > numberOfPages - (isMobile ? numOfPagesBeforeDotsMo : numOfPagesBeforeDots)
    );
  };

  // Create an array of numbers from 2 to numberOfPages - 2 (since 1st and last are always visible)
  const pageNumbersArray = useMemo(
    () => Array.from({ length: numberOfPages - 2 }, (_, i) => i + 2),
    [numberOfPages],
  );

  return (
    <>
      {pageNumbersArray.map((pageNumber) => {
        if (
          allPageNumbersAreVisible ||
          isNumberAtBeginningAndVisible(pageNumber) ||
          isNumberInCenterAndVisible(pageNumber) ||
          isNumberAtEndAndVisible(pageNumber)
        ) {
          return (
            <PageElement
              pageNumber={pageNumber}
              selectedPageNumber={selectedPageNumber}
              setSelectedPageNumber={setSelectedPageNumber}
              key={pageNumber}
            />
          );
        }
        return null;
      })}
    </>
  );
};
