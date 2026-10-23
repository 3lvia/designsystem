import { useLanguage } from '@elvia/elvis-toolbox';
import React, { FC } from 'react';

import { PaginatorPage } from './styledComponents';

interface PageElementProps {
  pageNumber: number;
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
}

export const PageElement: FC<PageElementProps> = ({
  pageNumber,
  selectedPageNumber,
  setSelectedPageNumber,
}) => {
  const lang = useLanguage();
  const formattedPageNumber = pageNumber.toLocaleString('nb-NO');
  const getAriaLabel = () => {
    if (lang === 'no') {
      return `Side ${formattedPageNumber}`;
    }

    return `Page ${formattedPageNumber}`;
  };

  return (
    <PaginatorPage
      pageNumber={pageNumber}
      onClick={() => setSelectedPageNumber(pageNumber)}
      selected={pageNumber === selectedPageNumber}
      aria-current={pageNumber === selectedPageNumber}
      aria-label={getAriaLabel()}
    >
      {formattedPageNumber}
    </PaginatorPage>
  );
};

interface FirstPageNumberProps {
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
}

export const FirstPageNumber: FC<FirstPageNumberProps> = ({ selectedPageNumber, setSelectedPageNumber }) => {
  return (
    <PageElement
      pageNumber={1}
      selectedPageNumber={selectedPageNumber}
      setSelectedPageNumber={setSelectedPageNumber}
    />
  );
};

interface LastPageNumberProps {
  numberOfPages: number;
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
  numberOfElements: number;
  lastNumberLimit?: number;
}

export const LastPageNumber: FC<LastPageNumberProps> = ({
  numberOfPages,
  selectedPageNumber,
  setSelectedPageNumber,
  numberOfElements,
  lastNumberLimit,
}) => {
  if (
    lastNumberLimit !== undefined &&
    lastNumberLimit <= numberOfElements &&
    selectedPageNumber < numberOfPages - 3
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
