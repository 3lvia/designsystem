import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { BetweenPageNumbers } from './BetweenPageNumbers';
import {
  maxVisiblePageNumbers,
  maxVisiblePageNumbersMo,
  visibleDotsBreakingPoint,
  visibleDotsBreakingPointMo,
} from './constants';
import { PageElement } from './PageElement';
import { PaginatorDots, PaginatorNumbersArea } from './styledComponents';

interface PaginatorNumbersAndDotsProps {
  numberOfPages: number;
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  const shouldHaveVisibleFirstDots = useMemo(() => {
    return (
      selectedPageNumber > (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      numberOfPages > (isMobile ? maxVisiblePageNumbersMo : maxVisiblePageNumbers)
    );
  }, [selectedPageNumber, numberOfPages, isMobile]);

  const shouldHaveVisibleLastDots = useMemo(() => {
    return (
      selectedPageNumber <=
        numberOfPages - (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      numberOfPages > (isMobile ? maxVisiblePageNumbersMo : maxVisiblePageNumbers)
    );
  }, [selectedPageNumber, numberOfPages, isMobile]);

  const FirstPageNumber = (): JSX.Element => {
    return (
      <PageElement
        pageNumber={1}
        selectedPageNumber={selectedPageNumber}
        setSelectedPageNumber={setSelectedPageNumber}
      />
    );
  };

  const LastPageNumber = (): JSX.Element | null => {
    if (
      lastNumberLimit !== undefined &&
      lastNumberLimit <= numberOfElements &&
      !(selectedPageNumber >= numberOfPages - 3)
    ) {
      return null;
    }

    return (
      <PageElement
        pageNumber={numberOfPages}
        selectedPageNumber={selectedPageNumber}
        setSelectedPageNumber={setSelectedPageNumber}
      />
    );
  };

  return (
    <PaginatorNumbersArea>
      <FirstPageNumber />
      {shouldHaveVisibleFirstDots && <PaginatorDots>...</PaginatorDots>}
      <BetweenPageNumbers
        isMobile={isMobile}
        numberOfPages={numberOfPages}
        selectedPageNumber={selectedPageNumber}
        setSelectedPageNumber={setSelectedPageNumber}
      />
      {shouldHaveVisibleLastDots && <PaginatorDots>...</PaginatorDots>}
      {numberOfPages > 1 && <LastPageNumber />}
    </PaginatorNumbersArea>
  );
};
