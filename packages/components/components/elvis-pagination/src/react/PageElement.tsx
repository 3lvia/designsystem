import React, { FC } from 'react';

import { PaginatorPage } from './styledComponents';

interface PageElementProps {
  lang: 'no' | 'en';
  pageNumber: number;
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
}

export const PageElement: FC<PageElementProps> = ({
  lang,
  pageNumber,
  selectedPageNumber,
  setSelectedPageNumber,
}) => {
  const getAriaLabel = (pageNumber: number): string => {
    if (lang === 'no') {
      return pageNumber === selectedPageNumber ? 'Valgt side' : 'Velg side ' + pageNumber;
    } else {
      return pageNumber === selectedPageNumber ? 'Selected page' : 'Select page ' + pageNumber;
    }
  };

  return (
    <PaginatorPage
      pageNumber={pageNumber}
      onClick={() => setSelectedPageNumber(pageNumber)}
      selected={pageNumber === selectedPageNumber}
      aria-current={pageNumber === selectedPageNumber}
      aria-label={getAriaLabel(pageNumber)}
    >
      {pageNumber.toLocaleString('nb-NO')}
    </PaginatorPage>
  );
};

interface FirstPageNumberProps {
  lang: 'no' | 'en';
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
}

export const FirstPageNumber: FC<FirstPageNumberProps> = ({
  selectedPageNumber,
  setSelectedPageNumber,
  lang,
}) => {
  return (
    <PageElement
      lang={lang}
      pageNumber={1}
      selectedPageNumber={selectedPageNumber}
      setSelectedPageNumber={setSelectedPageNumber}
    />
  );
};

interface LastPageNumberProps {
  lang: 'no' | 'en';
  numberOfPages: number;
  selectedPageNumber: number;
  setSelectedPageNumber: (page: number) => void;
  numberOfElements: number;
  lastNumberLimit?: number;
}

export const LastPageNumber: FC<LastPageNumberProps> = ({
  lang,
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
      lang={lang}
      pageNumber={numberOfPages}
      selectedPageNumber={selectedPageNumber}
      setSelectedPageNumber={setSelectedPageNumber}
    />
  );
};
