import styled from 'styled-components';
import { ColorType } from './elvia-chip';

export const colors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  blue: '#006ddb',
  green: '#21ac04',
  orange: '#db6d00',
  purple: '#b66dff',
  red: '#b90202',
  violet: '#490192',
};

const setOpacity = (color: string, opacity: number): string => `${color}${opacity}`;

const setBackgroundColor = (color: ColorType, isSelected: boolean, type: string) => {
  if (type !== 'removable') {
    return isSelected ? setOpacity(colors[color], 40) : 'transparent';
  } else {
    return setOpacity(colors[color], 40);
  }
};

type ChipComponent = {
  color: ColorType;
  isSelected: boolean;
  chipType: string;
  disabled: boolean;
};

export const ChipComponent = styled.button<ChipComponent>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;
  background-color: ${(props: { color: ColorType; isSelected: boolean; chipType: string }) =>
    setBackgroundColor(props.color, props.isSelected, props.chipType)};
  cursor: ${(props: { disabled: boolean }) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  line-height: 16px;
  padding: calc(8px - 1px) calc(16px - 1px);
  border-radius: 24px;
  &:hover:not(:disabled) {
    background-color: ${(props: { chipType: string }) =>
      props.chipType === 'removable' ? colors.elviaCharge : 'transparent'};
  }
`;

type ChipTitle = {
  disabled: boolean;
  color: ColorType;
};

export const ChipTitle = styled.div<ChipTitle>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  text-transform: 'unset';
  letter-spacing: 'unset';
  font-style: unset;
  color: ${colors.elviaOff};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? '0.3' : '1')};

  &.dot {
    ::before {
      display: inline-block;
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: transparent;
      margin: 0 8px 0 0;
    }
  }
  &.showDot {
    ::before {
      background-color: ${(props: { color: ColorType }) => colors[props.color]};
    }
  }
  &.disabledDot {
    ::before {
      opacity: 0.3;
    }
  }
`;

const SpanIcon = styled.span`
  border: none;
  background: transparent;
  display: flex;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.3 : 1)};
  i {
    border: none;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
  }
`;

export const CheckmarkIcon = styled(SpanIcon)`
  &.showCheckmarkIcon {
    visibility: visible;
  }
  visibility: hidden;
  padding-right: 8px;
  i {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.468.225c.562.393.699 1.168.305 1.73L9.346 22.566l-.001.002a3.347 3.347 0 01-5.427.09v-.002l-3.67-4.89a1.243 1.243 0 011.99-1.492l3.672 4.895a.86.86 0 001.395-.023l.002-.003L21.737.53a1.243 1.243 0 011.73-.305z' fill='black'/%3e%3c/svg%3e");
    height: 12px;
    width: 12px;
  }
`;

export const CloseIcon = styled(SpanIcon)`
  margin-left: 8px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-flex;
  align-items: center;
  i {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.636 2.122A1.243 1.243 0 1021.878.364L12 10.242 2.122.364A1.243 1.243 0 00.364 2.122L10.242 12 .364 21.878a1.243 1.243 0 101.758 1.758L12 13.758l9.878 9.878a1.243 1.243 0 101.758-1.758L13.758 12l9.878-9.878z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    height: 16px;
    width: 8px;
  }
`;
