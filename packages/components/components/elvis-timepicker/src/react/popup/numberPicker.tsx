import React, { useEffect, useRef } from 'react';
import { padDigit } from '../elvia-timepicker';
import { IconButton } from '../styledComponents';
import {
  ArrowButtonContainer,
  HorizontalLine,
  NumberButton,
  NumberListContainer,
  NumberPickerContainer,
  NumberPickerTitle,
} from './popupStyles';
import { Icon } from '@elvia/elvis-icon/react';

interface Props {
  title: string;
  numbers: number[];
  currentValue: number | undefined;
  onSelect: (value: number) => void;
}

const numberButtonHeight = 48;

export const NumberPicker: React.FC<Props> = ({ title, numbers, currentValue, onSelect }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const shuffleTo = (direction: 'next' | 'previous'): void => {
    if (currentValue == null) {
      onSelect(numbers[0]);
    } else {
      const index = numbers.indexOf(currentValue);

      if (index === -1) {
        onSelect(numbers[0]);
      }

      if (direction === 'next' && index !== numbers.length - 1) {
        onSelect(numbers[index + 1]);
      } else if (direction === 'next' && index === numbers.length - 1) {
        onSelect(numbers[0]);
      } else if (direction === 'previous' && index !== 0) {
        onSelect(numbers[index - 1]);
      } else {
        onSelect(numbers[numbers.length - 1]);
      }
    }
  };

  const isSelected = (val: number): boolean => val === currentValue;

  useEffect(() => {
    if (currentValue != null && listRef.current) {
      const index = numbers.indexOf(currentValue);

      if (index !== -1) {
        listRef.current.scrollTo({
          top: index * numberButtonHeight - numberButtonHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [currentValue]);

  return (
    <NumberPickerContainer>
      <NumberPickerTitle>{title}</NumberPickerTitle>
      <HorizontalLine />
      <ArrowButtonContainer>
        <IconButton size="small" onClick={() => shuffleTo('previous')}>
          <Icon name="arrowUpBold" size="xs" />
        </IconButton>
      </ArrowButtonContainer>
      <NumberListContainer ref={listRef}>
        {numbers.map((number) => (
          <NumberButton isSelected={isSelected(number)} key={number} onClick={() => onSelect(number)}>
            {padDigit(number)}
          </NumberButton>
        ))}
      </NumberListContainer>
      <ArrowButtonContainer>
        <IconButton size="small" onClick={() => shuffleTo('next')}>
          <Icon name="arrowDownBold" size="xs" />
        </IconButton>
      </ArrowButtonContainer>
    </NumberPickerContainer>
  );
};
