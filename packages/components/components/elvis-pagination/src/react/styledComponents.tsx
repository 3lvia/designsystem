import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypography } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey70: getColor('grey-70'),
  grey80: getColor('grey-80'),
};

const typography = {
  textSm: getTypography('text-sm'),
};

type PaginatorTypes = {
  isRightAligned: boolean;
};

export const Paginator = styled.div<PaginatorTypes>`
  display: flex;
  align-items: center;
  justify-content: ${(props: { isRightAligned: boolean }) => (props.isRightAligned ? 'flex-end' : 'start')};
  min-width: 325px;
  user-select: none;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    height: auto;
    justify-content: center;
    align-items: start;
  }
`;
export const PaginatorInfoContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    margin-top: 24px;
  }
`;

export const PaginatorInfoText = styled.div`
  ${typography.textSm}
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
`;
export const PaginatorInfoDropdown = styled.div`
  width: 72px;
  margin: 0 8px;
`;

type InfoAmountTypes = {
  isMobile: boolean;
};
export const PaginatorInfoAmount = styled.div<InfoAmountTypes>`
  ${typography.textSm}
  font-style: normal;
  text-align: left;
  white-space: nowrap;
  margin-right: ${(props: { isMobile: boolean }) => (props.isMobile ? '0px' : '24px')};
`;
export const PaginatorSelectorArea = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

type SelectorArrowBtnProps = {
  visible: boolean;
};

export const PaginatorSelectorArrowBtn = styled.button<SelectorArrowBtnProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  border: none;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  visibility: ${(props: { visible: boolean }) => (props.visible ? 'visible' : 'hidden')};

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${colors.elviaCharge};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;
export const PaginatorSelectorArrowLeft = styled.div`
  height: 16px;
  width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.22 11.453a.763.763 0 00-.162.243l.161-.243zm.005-.006L10.948.724a.766.766 0 011.083 1.084l-9.416 9.415h20.619a.766.766 0 110 1.532H2.615l9.416 9.416a.766.766 0 11-1.083 1.083L.224 12.531a.764.764 0 01-.166-.835' fill='black'/%3e%3c/svg%3e");
`;

export const PaginatorSelectorRighArrow = styled.div`
  height: 16px;
  width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.693 12.213a.748.748 0 00-.163-.243l-10.5-10.5a.75.75 0 10-1.06 1.06l9.22 9.22H1a.75.75 0 000 1.5h20.19l-9.22 9.22a.75.75 0 101.06 1.06l10.5-10.5a.747.747 0 00.163-.817z' fill='black'/%3e%3c/svg%3e");
`;

export const PaginatorNumbersArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  user-select: none;
`;

type PaginatorNumberProps = {
  noShow: boolean;
  selected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onClick?: any;
  key: number | string;
  children?: number;
};

export const PaginatorNumber = styled.button<PaginatorNumberProps>`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.2px;
  text-align: center;

  display: ${(props: { noShow: boolean }) => (props.noShow ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  background: transparent;
  border: ${(props: { selected: boolean }) => (props.selected ? `1px solid ${colors.elviaBlack}` : 'none')};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin: 0 4px;
  margin-left: ${(props: { isFirst: boolean }) => (props.isFirst ? '0px' : '4px')};
  margin-right: ${(props: { isLast: boolean }) => (props.isLast ? '0px' : '4px')};
  border-radius: 50%;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${colors.elviaCharge};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

type PaginatorDotsTypes = {
  noDots: boolean;
};

export const PaginatorDots = styled.div<PaginatorDotsTypes>`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.2px;
  text-align: center;
  display: ${(props: { noDots: boolean }) => (props.noDots ? 'none' : 'inherit')};
  width: ${(props: { noDots: boolean }) => (props.noDots ? '0px' : '20px')};
`;
