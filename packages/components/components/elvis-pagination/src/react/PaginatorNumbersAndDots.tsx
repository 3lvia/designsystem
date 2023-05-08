import React, { FC, useMemo } from 'react';
import { BetweenPageNumbers } from './BetweenPageNumbers';
import {
  maxVisiblePageNumbers,
  maxVisiblePageNumbersSm,
  visibleDotsBreakingPoint,
  visibleDotsBreakingPointSm,
} from './constants';
import { FirstPageNumber, LastPageNumber } from './PageElement';
import { PaginatorDots, PaginatorNumbersArea } from './styledComponents';
import { useBreakpoint } from '@elvia/elvis-toolbox';

interface PaginatorNumbersAndDotsProps {
  numberOfPages: number;
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
  numberOfElements: number;
  lastNumberLimit?: number;
}

export const PaginatorNumbersAndDots: FC<PaginatorNumbersAndDotsProps> = ({
  numberOfPages,
  selectedPageNumber,
  setSelectedPageNumber,
  numberOfElements,
  lastNumberLimit,
}) => {
  const isMobile = !useBreakpoint('gt-mobile');

  const shouldHaveVisibleFirstDots = useMemo(() => {
    return (
      selectedPageNumber > (isMobile ? visibleDotsBreakingPointSm : visibleDotsBreakingPoint) &&
      numberOfPages > (isMobile ? maxVisiblePageNumbersSm : maxVisiblePageNumbers)
    );
  }, [selectedPageNumber, numberOfPages, isMobile]);

  const shouldHaveVisibleLastDots = useMemo(() => {
    return (
      selectedPageNumber <=
        numberOfPages - (isMobile ? visibleDotsBreakingPointSm : visibleDotsBreakingPoint) &&
      numberOfPages > (isMobile ? maxVisiblePageNumbersSm : maxVisiblePageNumbers)
    );
  }, [selectedPageNumber, numberOfPages, isMobile]);

  return (
    <PaginatorNumbersArea>
      <FirstPageNumber
        selectedPageNumber={selectedPageNumber}
        setSelectedPageNumber={setSelectedPageNumber}
      />
      {shouldHaveVisibleFirstDots && <PaginatorDots>...</PaginatorDots>}
      <BetweenPageNumbers
        isMobile={isMobile}
        numberOfPages={numberOfPages}
        selectedPageNumber={selectedPageNumber}
        setSelectedPageNumber={setSelectedPageNumber}
      />
      {shouldHaveVisibleLastDots && <PaginatorDots>...</PaginatorDots>}
      {numberOfPages > 1 && (
        <LastPageNumber
          selectedPageNumber={selectedPageNumber}
          setSelectedPageNumber={setSelectedPageNumber}
          numberOfElements={numberOfElements}
          numberOfPages={numberOfPages}
          lastNumberLimit={lastNumberLimit}
        />
      )}
    </PaginatorNumbersArea>
  );
};
