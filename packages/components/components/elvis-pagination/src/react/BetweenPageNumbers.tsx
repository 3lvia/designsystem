import React, { Dispatch, FC, SetStateAction, useMemo } from 'react';

import { PageElement } from './PageElement';
import {
  maxVisiblePageNumbers,
  maxVisiblePageNumbersSm,
  numOfPagesBeforeDots,
  numOfPagesBeforeDotsSm,
  numOfPagesBesideSelected,
  numOfPagesBesideSelectedSm,
  visibleDotsBreakingPoint,
  visibleDotsBreakingPointSm,
} from './constants';

interface BetweenPageNumbersProps {
  lang: 'no' | 'en';
  numberOfPages: number;
  selectedPageNumber: number;
  isMobile: boolean;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}

export const BetweenPageNumbers: FC<BetweenPageNumbersProps> = ({
  lang,
  numberOfPages,
  selectedPageNumber,
  isMobile,
  setSelectedPageNumber,
}) => {
  const allPageNumbersAreVisible = useMemo(() => {
    return numberOfPages === (isMobile ? maxVisiblePageNumbersSm : maxVisiblePageNumbers);
  }, [numberOfPages, isMobile]);

  const isNumberAtBeginningAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber <= (isMobile ? visibleDotsBreakingPointSm : visibleDotsBreakingPoint) &&
      pageNumber <= (isMobile ? numOfPagesBeforeDotsSm : numOfPagesBeforeDots)
    );
  };

  const isNumberInCenterAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber > (isMobile ? visibleDotsBreakingPointSm : visibleDotsBreakingPoint) &&
      selectedPageNumber <=
        numberOfPages - (isMobile ? visibleDotsBreakingPointSm : visibleDotsBreakingPoint) &&
      pageNumber >= selectedPageNumber - (isMobile ? numOfPagesBesideSelectedSm : numOfPagesBesideSelected) &&
      pageNumber <= selectedPageNumber + (isMobile ? numOfPagesBesideSelectedSm : numOfPagesBesideSelected)
    );
  };

  const isNumberAtEndAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber >
        numberOfPages - (isMobile ? visibleDotsBreakingPointSm : visibleDotsBreakingPoint) &&
      pageNumber > numberOfPages - (isMobile ? numOfPagesBeforeDotsSm : numOfPagesBeforeDots)
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
              lang={lang}
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
