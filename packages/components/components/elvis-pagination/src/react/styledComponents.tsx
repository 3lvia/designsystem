import styled from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

type PaginatorProps = {
  isRightAligned: boolean;
};

export const Paginator = styled.div<PaginatorProps>`
  align-items: center;
  column-gap: 24px;
  display: flex;
  flex-wrap: wrap-reverse;
  height: auto;
  justify-content: ${({ isRightAligned }) => (isRightAligned ? 'flex-end' : 'flex-start')};
  max-width: 100%;
  width: 100%;
  row-gap: 8px;
  user-select: none;
`;

export const PaginatorInfoContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const PaginatorInfoText = styled.div`
  ${getTypographyCss('text-sm')}
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
`;

export const PaginatorInfoDropdown = styled.div`
  width: 82px; //82px = 4+8px padding, 8px gap + 32px button, + 30px for number

  .number-of-items-dropdown {
    padding: 0;
  }
`;

export const PaginatorInfoAmount = styled.div`
  ${getTypographyCss('text-sm')}
  font-style: normal;
  text-align: left;
  white-space: nowrap;
`;

export const PaginatorSelectorArea = styled.nav`
  align-items: center;
  column-gap: 4px;
  display: flex;
  max-width: 100%;
  user-select: none;
`;

type SelectorArrowBtnProps = {
  visible: boolean;
};

export const PaginatorSelectorArrowBtn = styled.button<SelectorArrowBtnProps>`
  align-items: center;
  background: transparent;
  border-radius: 50%;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 36px;
  min-width: 36px;
  padding: 0;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${getThemeColor('background-hover-1')};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PaginatorNumbersArea = styled.div`
  align-items: baseline;
  column-gap: 4px;
  display: flex;
  flex-direction: row;
  user-select: none;
`;

type PaginatorPageProps = {
  pageNumber: number;
  selected: boolean;
};

export const PaginatorPage = styled.button<PaginatorPageProps>`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${getThemeColor('text-1')};

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: ${({ selected }) => (selected ? `1px solid ${getThemeColor('border-selected-2')}` : 'none')};
  border-radius: 50%;
  min-width: 36px;
  ${({ pageNumber }) => pageNumber.toString().length < 4 && 'width: 36px'};
  height: 36px;

  border-radius: 100px;
  cursor: pointer;
  padding: 0%;
  ${({ pageNumber }) => pageNumber.toString().length >= 4 && `padding: 8px 16px;`};
  ${({ pageNumber, selected }) => pageNumber.toString().length >= 4 && selected && `padding: 8px 15px;`};

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${getThemeColor('border-hover-1')};
      ${({ pageNumber, selected }) =>
        (pageNumber.toString().length >= 4 || (pageNumber.toString().length >= 4 && selected)) &&
        `padding: 8px 15px;`};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PaginatorDots = styled.div`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 1.2px;
  line-height: 21px;
  text-align: center;
  color: ${getThemeColor('text-1')};

  align-items: center;
  display: flex;
  height: 36px;
  justify-content: center;
  width: 36px;
`;
