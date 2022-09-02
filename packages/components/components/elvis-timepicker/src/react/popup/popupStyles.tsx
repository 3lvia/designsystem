import styled from 'styled-components';
import { colors } from '../styledComponents';

export const OverlayContainer = styled.div`
  background-color: ${colors.elviaWhite};
  border-radius: 4px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  position: absolute;
  z-index: 108;
  display: flex;
`;

export const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export const NumberPickerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NumberPickerTitle = styled.h4`
  font-family: inherit;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: inherit;
  color: inherit;
  margin: 0;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid ${colors.grey05};
  border-width: 0 0 1px 0;
  margin: 0;
`;

export const NumberListContainer = styled.div`
  overflow: auto;
  height: 144px;
  width: 100%;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

interface NumberButtonProps {
  isSelected: boolean;
}

export const NumberButton = styled.button<NumberButtonProps>`
  width: 100%;
  font-family: inherit;
  letter-spacing: inherit;
  color: inherit;
  font-size: inherit;
  line-height: 28px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  height: 48px;
  background: ${(props) => (props.isSelected ? colors.grey10 : 'transparent')};
  scroll-snap-align: center;
  cursor: pointer;

  &:hover {
    background: ${colors.grey05};
  }
`;
