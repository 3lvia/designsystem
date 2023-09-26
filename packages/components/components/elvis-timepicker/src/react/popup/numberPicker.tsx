import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { padDigit } from '../padDigit';
import { IconButton, IconWrapper } from '@elvia/elvis-toolbox';
import arrowUpBold from '@elvia/elvis-assets-icons/dist/icons/arrowUpBold';
import arrowDownBold from '@elvia/elvis-assets-icons/dist/icons/arrowDownBold';
import {
  ArrowButtonContainer,
  HorizontalLine,
  NumberButton,
  NumberList,
  NumberPickerContainer,
  NumberPickerTitle,
} from './popupStyles';
import { listButtonHeight } from './buttonHeight';
import { ChangeType } from '../elviaTimepicker.types';

interface Props {
  title: string;
  numbers: number[];
  currentTime?: Date | null;
  onSelect: (changeType: ChangeType, value: number, isDisabled?: boolean) => void;
  timeUnit: ChangeType;
  minTime?: Date;
  maxTime?: Date;
}

export const NumberPicker: React.FC<Props> = ({
  title,
  numbers,
  currentTime,
  onSelect,
  timeUnit,
  minTime,
  maxTime,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [loopedNumbers, setLoopedNumbers] = useState<number[]>([]);
  const currentValue = setCurrentValue();

  function setCurrentValue(): number | undefined {
    switch (timeUnit) {
      case 'hour':
        return currentTime?.getHours();
      case 'minute':
        return currentTime?.getMinutes();
      case 'second':
        return currentTime?.getSeconds();
      default:
        return undefined;
    }
  }

  const loopScroll = () => {
    if (listRef.current) {
      if (listRef.current.scrollTop === 0) {
        listRef.current.scroll({
          top: numbers.length * listButtonHeight,
        });
      } else if (
        listRef.current.scrollTop ===
        listButtonHeight * loopedNumbers.length + listButtonHeight * 2 - listButtonHeight * 5
      ) {
        listRef.current.scroll({ top: listButtonHeight });
      }
    }
  };

  const shuffleTo = (direction: 'next' | 'previous'): void => {
    if (currentValue == null) {
      onSelect(timeUnit, numbers[0], isNumberDisabled(numbers[0]));
    } else {
      const index = numbers.indexOf(currentValue);

      if (index === -1) {
        onSelect(timeUnit, numbers[0], isNumberDisabled(numbers[0]));
        return;
      }

      if (direction === 'next' && index !== numbers.length - 1) {
        onSelect(timeUnit, numbers[index + 1], isNumberDisabled(numbers[index + 1]));
      } else if (direction === 'next' && index === numbers.length - 1) {
        onSelect(timeUnit, numbers[0], isNumberDisabled(numbers[0]));
      } else if (direction === 'previous' && index !== 0) {
        onSelect(timeUnit, numbers[index - 1], isNumberDisabled(numbers[index - 1]));
      } else {
        onSelect(timeUnit, numbers[numbers.length - 1], isNumberDisabled(numbers[numbers.length - 1]));
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    switch (event.key) {
      case 'ArrowDown': {
        shuffleTo('next');
        break;
      }
      case 'ArrowUp': {
        shuffleTo('previous');
        break;
      }
    }
  };

  const isNumberDisabled = (num: number): boolean => {
    switch (timeUnit) {
      case 'hour':
        if (minTime && num < minTime?.getHours()) {
          return true;
        }
        if (maxTime && num > maxTime?.getHours()) {
          return true;
        }
        return false;
      case 'minute':
        if (minTime && num < minTime?.getMinutes() && currentTime?.getHours() === minTime?.getHours()) {
          return true;
        }
        if (maxTime && num > maxTime?.getMinutes() && currentTime?.getHours() === maxTime?.getHours()) {
          return true;
        }
        return false;
      case 'second':
        if (minTime && num < minTime?.getSeconds() && currentTime?.getMinutes() === minTime?.getMinutes()) {
          return true;
        }
        if (maxTime && num > maxTime?.getSeconds() && currentTime?.getMinutes() === maxTime?.getMinutes()) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  useEffect(() => {
    // Set scroll position on current value
    if (listRef.current) {
      // Search from index 1 to prevent matching the duplicated numbers at the start of the list
      const index = loopedNumbers.indexOf(currentValue != null ? currentValue : numbers[0], 1);

      // Check if scrollTo exists due to function missing in tests
      if (index !== -1 && listRef.current?.scrollTo) {
        listRef.current.scrollTo({
          top: index * listButtonHeight - listButtonHeight,
        });
      }
    }
  }, [currentValue, loopedNumbers]);

  useEffect(() => {
    const listClone = numbers.slice();
    setLoopedNumbers([...listClone.slice(listClone.length - 2), ...listClone, ...listClone.slice(0, 2)]);
  }, []);

  return (
    <NumberPickerContainer data-testid={`${title}-number-list`}>
      <NumberPickerTitle data-testid="number-list-title">{title}</NumberPickerTitle>
      <HorizontalLine />
      <NumberList
        ref={listRef}
        tabIndex={0}
        onScroll={loopScroll}
        onKeyDown={onKeyDown}
        aria-label={`${title} valg. Bruk piltaster for å endre verdi.`}
      >
        <ArrowButtonContainer>
          <IconButton
            aria-label={`Forrige ${title}`}
            size="sm"
            tabIndex={-1}
            onClick={() => shuffleTo('previous')}
            data-testid={`${title}-prev-value-button`}
          >
            <IconWrapper icon={arrowUpBold} size="xs" />
          </IconButton>
        </ArrowButtonContainer>
        {loopedNumbers.map((number, index) => (
          <NumberButton
            tabIndex={-1}
            isSelected={number === currentValue}
            isDisabled={isNumberDisabled(number)}
            key={index}
            onClick={() => onSelect(timeUnit, number, isNumberDisabled(number))}
            data-testid={`${title}-number-button`}
            data-id={`${title}-${padDigit(number)}`}
            aria-label={`${title} ${padDigit(number)}`}
          >
            {padDigit(number)}
          </NumberButton>
        ))}
        <ArrowButtonContainer>
          <IconButton
            aria-label={`Neste ${title}`}
            size="sm"
            tabIndex={-1}
            onClick={() => shuffleTo('next')}
            data-testid={`${title}-next-value-button`}
          >
            <IconWrapper icon={arrowDownBold} size="xs" />
          </IconButton>
        </ArrowButtonContainer>
      </NumberList>
    </NumberPickerContainer>
  );
};
