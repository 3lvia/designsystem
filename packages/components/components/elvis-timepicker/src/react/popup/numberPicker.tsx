import React, { useEffect, useRef, useState } from 'react';
import { padDigit } from '../padDigit';
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
  const [loopedNumbers, setLoopedNumbers] = useState<number[]>([]);

  const loopScroll = () => {
    if (listRef.current) {
      if (listRef.current.scrollTop === 0) {
        listRef.current.scroll({
          top: numbers.length * numberButtonHeight,
        });
      } else if (
        listRef.current.scrollTop ===
        numberButtonHeight * loopedNumbers.length - numberButtonHeight * 3
      ) {
        listRef.current.scroll({ top: numberButtonHeight });
      }
    }
  };

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

  useEffect(() => {
    // Set scroll position on current value
    if (listRef.current) {
      const index = loopedNumbers.indexOf(currentValue != null ? currentValue : numbers[0]);

      if (index !== -1) {
        listRef.current.scrollTo({
          top: index * numberButtonHeight - numberButtonHeight,
        });
      }
    }
  }, [currentValue, loopedNumbers]);

  useEffect(() => {
    const listClone = numbers.slice();
    setLoopedNumbers([...listClone.slice(listClone.length - 2), ...listClone, ...listClone.slice(0, 2)]);
  }, []);

  return (
    <NumberPickerContainer>
      <NumberPickerTitle>{title}</NumberPickerTitle>
      <HorizontalLine />
      <ArrowButtonContainer>
        <IconButton size="small" onClick={() => shuffleTo('previous')}>
          <Icon name="arrowUpBold" size="xs" />
        </IconButton>
      </ArrowButtonContainer>
      <NumberListContainer ref={listRef} onScroll={loopScroll}>
        {loopedNumbers.map((number, index) => (
          <NumberButton
            tabIndex={-1}
            isSelected={number === currentValue}
            key={index}
            onClick={() => onSelect(number)}
          >
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
