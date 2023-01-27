import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaBlack: getColor('black'),
};

const typography = {
  textSm: getTypographyCss('text-sm'),
};

type PaginatorProps = {
  isRightAligned: boolean;
};

export const Paginator = styled.div<PaginatorProps>`
  align-items: center;
  column-gap: 24px;
  display: flex;
  flex-wrap: wrap-reverse;
  height: auto;
  justify-content: ${(props) => (props.isRightAligned ? 'flex-end' : 'flex-start')};
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
  ${typography.textSm}
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
`;
export const PaginatorInfoDropdown = styled.div`
  width: 75px;

  .number-of-items-dropdown {
    padding: 0;
  }
`;

export const PaginatorInfoAmount = styled.div`
  ${typography.textSm}
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
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${colors.elviaCharge};
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
  color: ${colors.elviaBlack};

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: ${(props) => (props.selected ? `1px solid ${colors.elviaBlack}` : 'none')};
  border-radius: 50%;
  min-width: 36px;
  ${(props) => props.pageNumber.toString().length < 5 && 'width: 36px'};
  height: 36px;

  border-radius: 100px;
  cursor: pointer;
  padding: 0%;
  ${(props) => props.pageNumber.toString().length >= 5 && `padding: 8px 16px;`};
  ${(props) => props.pageNumber.toString().length >= 5 && props.selected && `padding: 8px 15px;`};

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${colors.elviaCharge};
      ${(props) =>
        (props.pageNumber.toString().length >= 5 ||
          (props.pageNumber.toString().length >= 5 && props.selected)) &&
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
  color: ${colors.elviaBlack};

  align-items: center;
  display: flex;
  height: 36px;
  justify-content: center;
  width: 36px;
`;
