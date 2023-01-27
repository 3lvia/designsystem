import React, { Dispatch, FC, SetStateAction } from 'react';
import { PaginatorPage } from './styledComponents';

interface PageElementProps {
  pageNumber: number;
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
}

export const PageElement: FC<PageElementProps> = ({
  pageNumber,
  selectedPageNumber,
  setSelectedPageNumber,
}) => {
  const getAriaLabel = (pageNumber: number): string => {
    return pageNumber === selectedPageNumber ? 'Valgt side' : 'Velg side ' + pageNumber;
  };

  return (
    <PaginatorPage
      pageNumber={pageNumber}
      onClick={() => setSelectedPageNumber(pageNumber)}
      selected={pageNumber === selectedPageNumber}
      aria-current={pageNumber === selectedPageNumber}
      aria-label={getAriaLabel(pageNumber)}
      data-testid={`paginator-button-${pageNumber}`}
    >
      {pageNumber.toLocaleString('nb-NO')}
    </PaginatorPage>
  );
};

interface FirstPageNumberProps {
  selectedPageNumber: number;
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
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
  setSelectedPageNumber: Dispatch<SetStateAction<number>>;
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
