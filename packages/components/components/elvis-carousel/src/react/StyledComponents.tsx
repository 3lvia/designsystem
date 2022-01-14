import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypography } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  white: getColor('elvia-on'),
  black: getColor('elvia-off'),
};

const typography = {
  textMd: getTypography('text-md'),
};

const mobileMax = '767px';

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  @keyframes exitLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes exitRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .exit-animation {
    animation: ${(props: { slideDirection: string }) =>
        props.slideDirection === 'left' ? 'exitLeft' : 'exitRight'}
      500ms ease-in;
  }
  .enter-animation {
    animation: fadeInOpacity 0.5s ease-in;
  }
`;

export const CarouselElementContainer = styled.div`
  margin-bottom: 24px;

  // Prevent imagine dragging
  // Note: This does not work for Firefox
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  &:active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    user-select: none;
    @media (hover: none) {
      transform: scale(0.98);
    }
  }
`;

type CarouselElementTypes = {
  onMouseDown: any;
  onMouseUp: any;
  onMouseLeave: any;
  onMouseMove: any;
  onTouchStart: any;
  onTouchMove: any;
  onTouchEnd: any;
};

export const CarouselElement = styled.div<CarouselElementTypes>`
  display: flex;
  align-items: center;
  flex-direction: column;

  ${typography.textMd}
  padding-bottom: '10px';
  * {
    margin: 0px;
    ${typography.textMd}
  }
`;

export const CarouselTitle = styled.div`
  margin-top: 0;
  * {
    margin-top: 0;
  }
`;

export const NavigationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: ${mobileMax}) {
    justify-content: space-between;
  }
`;

export const ListOfDots = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
`;

export const Dot = styled.button`
  border: 1px solid
    ${(props: { isSelected: boolean }) => (props.isSelected ? colors.elviaCharge : colors.black)};
  height: ${(props: { isSelected: boolean }) => (props.isSelected ? '9px' : '8px')};
  width: ${(props: { isSelected: boolean }) => (props.isSelected ? '9px' : '8px')};
  @media (max-width: 767px) {
    border: 1px solid
      ${(props: { isSelected: boolean }) => (props.isSelected ? colors.elviaCharge : colors.black)};
    height: ${(props: { isSelected: boolean }) => (props.isSelected ? '13px' : '12px')};
    width: ${(props: { isSelected: boolean }) => (props.isSelected ? '13px' : '12px')};
  }

  border-radius: 50%;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? colors.elviaCharge : colors.white};
  margin: ${(props: { isSelected: boolean }) => (props.isSelected ? '7.5px' : '8px')};
  cursor: pointer;
  padding: 0;
  &:hover {
    background-color: ${colors.elviaCharge};
  }
`;

export const LeftCarouselButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  padding: 0px;
  visibility: ${(props: { hidden: boolean }) => (props.hidden ? 'hidden' : 'visible')};

  cursor: pointer;
  &:hover {
    i {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.4 12a.8.8 0 01.8-.8h9.6a.8.8 0 110 1.6H7.2a.8.8 0 01-.8-.8z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.766 7.434a.8.8 0 010 1.132L8.33 12l3.435 3.434a.8.8 0 11-1.132 1.132l-4-4a.8.8 0 010-1.132l4-4a.8.8 0 011.132 0z' fill='black'/%3e%3c/svg%3e");
    }
  }

  i {
    border: none;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.4 12a.8.8 0 01.8-.8h9.6a.8.8 0 110 1.6H7.2a.8.8 0 01-.8-.8z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.766 7.434a.8.8 0 010 1.132L8.33 12l3.435 3.434a.8.8 0 11-1.132 1.132l-4-4a.8.8 0 010-1.132l4-4a.8.8 0 011.132 0z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.6C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4 5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z' fill='%2329D305'/%3e%3c/svg%3e");
    background-color: ${colors.white};
    display: inline-block;
    height: 32px;
    width: 32px;
  }
`;

export const RightCarouselButton = styled.button`
  margin-left: 0;
  border: none;
  background: transparent;
  display: flex;
  padding: 0px;
  visibility: ${(props: { hidden: boolean }) => (props.hidden ? 'hidden' : 'visible')};
  cursor: pointer;
  &:hover {
    i {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.366 7.434a.8.8 0 10-1.132 1.132L14.87 11.2H7.2a.8.8 0 100 1.6h7.669l-2.635 2.634a.8.8 0 101.132 1.132l3.996-3.996a.77.77 0 00.166-.237.798.798 0 00-.166-.902l-3.996-3.997z' fill='black'/%3e%3c/svg%3e");
    }
  }
  i {
    border: none;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.366 7.434a.8.8 0 10-1.132 1.132L14.87 11.2H7.2a.8.8 0 100 1.6h7.669l-2.635 2.634a.8.8 0 101.132 1.132l3.996-3.996a.77.77 0 00.166-.237.798.798 0 00-.166-.902l-3.996-3.997z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 22.4c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z' fill='%2329D305'/%3e%3c/svg%3e");
    background-color: ${colors.white};
    display: inline-block;
    height: 32px;
    width: 32px;
  }
`;

export const CheckButton = styled.button`
  margin-left: 0;
  border: none;
  background: transparent;
  display: flex;
  padding: 0px;
  cursor: pointer;
  &:hover {
    i {
      background-color: ${colors.elviaCharge};
    }
  }
  i {
    border: none;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='%2329D305'%3e%3cpath d='M12 23.997c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z'/%3e%3cpath  fill='black' fill-rule='evenodd' clip-rule='evenodd' d='M6.53 11.307a.75.75 0 011.061 0l3.005 3.002 6.54-6.534a.75.75 0 011.062 1.06l-7.072 7.063a.75.75 0 01-1.06 0L6.53 12.366a.748.748 0 010-1.06z'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    display: inline-block;
    display: inline-block;
    height: 32px;
    width: 32px;
  }
`;
