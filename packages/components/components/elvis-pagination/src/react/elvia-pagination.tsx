import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import classNames from 'classnames';
import * as StyledPaginator from './styledComponents';
import './style.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface SelectionNumber {
  start: number;
  end: number;
}

export interface PaginationProps {
  value: SelectionNumber;
  items: number;
  paginatorDropdownOptions: Array<DropdownOption>;
  labelDisplaying: string;
  label: string;
  labelOf: string;
  valueOnChange?: (value: SelectionNumber) => void;
  webcomponent?: any;
}

export const paginationOptions = [
  {
    value: '10',
    label: '10'
  },
  {
    value: '20',
    label: '20'
  },
  {
    value: '30',
    label: '30'
  },
  {
    value: '40',
    label: '40'
  },
];


const Pagination: FC<PaginationProps> = ({
  value = { start: undefined, end: undefined },
  items = 0,
  paginatorDropdownOptions = paginationOptions,
  label = 'rader',
  labelDisplaying = 'Viser',
  labelOf = 'av',
  valueOnChange,
  webcomponent
}) => {
  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(paginatorDropdownOptions[0]);
  const [showPaginationMenu, setShowPaginationMenu] = useState(true);
  const [currentValue, setvCurrentValue] = useState(value);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedNumber, setSelectedNumber] = useState(1);

  useEffect(() => {
    updateValue(selectedNumber);
  }, [selectedNumber, currentDisplayAmount])

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const getWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', getWindowDimensions);
    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    };
  });

  // calculate amount of selection numbers, based on total pages
  let selectorAmount = Math.ceil(items / parseInt(currentDisplayAmount.value));
  if (isNaN(parseInt(currentDisplayAmount.value))) {
    selectorAmount = 0;
    setShowPaginationMenu(false)
  }
  // create array from numbers
  const selectionNumbers = Array.from(Array(selectorAmount + 1).keys()).slice(1);

  const activeNumber = (chosenNumber: number) => {
    return selectedNumber === chosenNumber;
  }
  // update selected number on arrow click
  const updateSelectedPageLeft = () => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn - 1)
  }
  const updateSelectedPageRight = () => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn + 1)
  }

  const isLeftArrow = () => {
    if (showPaginationMenu) {
      return selectedNumber > 1;
    }
    return;
  }
  const isRightArrow = () => {
    if (showPaginationMenu) {
      return selectedNumber < selectionNumbers.length;
    }
    return;
  }
  const leftArrow = classNames('ewc-pagination--selector__arrow_btn', {
    ['ewc-pagination--selector__arrow_btn--hide']: !isLeftArrow(),
  });
  const rightArrow = classNames('ewc-pagination--selector__arrow_btn', {
    ['ewc-pagination--selector__arrow_btn--hide']: !isRightArrow(),
  });

  // Visible numbers in paginator 
  const Paginators = () => {
    const visibleNumbers = [];
    let firstNumbers;
    let centerNumbers;
    let lastNumbers;

    let firstDots;
    let lastDots;

    let firstCenter = false;
    let middleCenter = false;

    const isShowAll = false;

    const isMobile = windowWidth < 768;

    const getFirstNumber = () => {
      firstNumbers =
        <StyledPaginator.PaginatorNumber
          selected={activeNumber(1)}
          key={'firstPaginationNumb'}
          onClick={() => setSelectedNumber(1)}>
          {1}
        </StyledPaginator.PaginatorNumber>
    }
    const getFirstDots = () => {
      if (selectedNumber >= 5 && selectionNumbers.length >= 8 && !isMobile) {
        firstDots = <StyledPaginator.PaginatorDots key={'firstDots'}>...</StyledPaginator.PaginatorDots>;
      } else if (selectedNumber >= 4 && selectionNumbers.length >= 5 && isMobile) {
        firstDots = <StyledPaginator.PaginatorDots key={'firstDotsMobile'}>...</StyledPaginator.PaginatorDots>;
      } else {
        firstDots = <div key={'noFirstDots'}></div>;
      }
    }
    const getCenterNumbers = (currentSelectionNumber: number) => {
      // Initiate when selected number is 1 or below 5
      if (currentSelectionNumber === 1 || currentSelectionNumber < 5) {
        centerNumbers = selectionNumbers.map((number, index) => {
          if (number > 1 && number <= 6 && number !== selectionNumbers.length && !isMobile) {
            firstCenter = true;
            return (
              <StyledPaginator.PaginatorNumber
                selected={activeNumber(number)}
                key={index}
                onClick={() => setSelectedNumber(number)}>
                {number}
              </StyledPaginator.PaginatorNumber>
            )
          } else if (number > 1 && number <= 4 && number !== selectionNumbers.length && isMobile) {
            firstCenter = true;
            return (
              <StyledPaginator.PaginatorNumber
                selected={activeNumber(number)}
                key={index}
                onClick={() => setSelectedNumber(number)}>
                {number}
              </StyledPaginator.PaginatorNumber>
            )
          } else {
            firstCenter = false;
          }
        })
      }
      // if selected numbers is 2+/- away from first or last selectable number
      if (currentSelectionNumber >= 4 && firstCenter === false) {
        centerNumbers = selectionNumbers.map((number, index) => {
          if (number >= selectedNumber - 2 && number <= selectedNumber + 2 && number !== selectionNumbers.length && number !== 1 && !isMobile) {
            middleCenter = true;
            return (
              <StyledPaginator.PaginatorNumber
                selected={activeNumber(number)}
                key={index}
                onClick={() => setSelectedNumber(number)}>
                {number}
              </StyledPaginator.PaginatorNumber>
            )
          } else if (number >= selectedNumber - 1 && number <= selectedNumber + 1 && number !== selectionNumbers.length && number !== 1 && isMobile) {
            middleCenter = true;
            return (
              <StyledPaginator.PaginatorNumber
                selected={activeNumber(number)}
                key={index}
                onClick={() => setSelectedNumber(number)}>
                {number}
              </StyledPaginator.PaginatorNumber>
            )
          } else {
            middleCenter = false;
          }
        })
      }
      // If selected number is i proximity of last selectable number
      if (currentSelectionNumber >= selectionNumbers.length - 2 && middleCenter === false) {
        centerNumbers = selectionNumbers.map((number, index) => {
          if (number >= selectionNumbers.length - 5 && number !== selectionNumbers.length && number !== 1 && !isMobile) {
            return (
              <StyledPaginator.PaginatorNumber
                selected={activeNumber(number)}
                key={index}
                onClick={() => setSelectedNumber(number)}>
                {number}
              </StyledPaginator.PaginatorNumber>
            )
          } else if (number >= selectionNumbers.length - 3 && number !== selectionNumbers.length && number !== 1 && isMobile) {
            return (
              <StyledPaginator.PaginatorNumber
                selected={activeNumber(number)}
                key={index}
                onClick={() => setSelectedNumber(number)}>
                {number}
              </StyledPaginator.PaginatorNumber>
            )
          }
        })
      }
    }
    const getLastDots = () => {

      if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 7 && !isMobile) {
        lastDots = <div key={'lastDots'}>...</div>;
      } else if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 5 && isMobile) {
        lastDots = <div key={'lastDotsMobile'}>...</div>;
      } else {
        lastDots = <div key={'nolastDots'}></div>;
      }
    }
    const getLastNumber = () => {
      lastNumbers =
        <StyledPaginator.PaginatorNumber
          selected={activeNumber(selectionNumbers.length)}
          key={'lastPaginationNumb'}
          onClick={() => setSelectedNumber(selectionNumbers.length)}>
          {selectionNumbers.length}
        </StyledPaginator.PaginatorNumber>
    }

    // get visible numbers
    if (!isShowAll) {
      getFirstNumber();
      getFirstDots();
      getCenterNumbers(selectedNumber);
      getLastDots();
      getLastNumber();
      visibleNumbers.push(firstNumbers, firstDots, centerNumbers, lastDots, lastNumbers);
    }
    return visibleNumbers;
  }

  const onDropdownChangeHandler = (selectionRange: DropdownOption) => {
    if (isNaN(parseInt(selectionRange.value)) || items === 0) {
      setShowPaginationMenu(false);
      return
    }
    if (!showPaginationMenu) {
      setShowPaginationMenu(true);
    }
    setCurrentDisplayAmount(selectionRange);
    // Check if current selection number in avalailable selectionNumbers array
    const isSelectedInRange = selectionNumbers.includes(selectedNumber);
    if (!isSelectedInRange) {
      setSelectedNumber(selectionNumbers.length);
    }
  }

  // set rangevalue and return in valueOnChange function
  const updateValue = (value: number) => {
    if (!selectionNumbers.includes(value)) {
      return;
    }

    const startRange = (parseInt(currentDisplayAmount.value) * value) - parseInt(currentDisplayAmount.value) + 1;
    let endRange
    endRange = startRange + parseInt(currentDisplayAmount.value) - 1;
    if (value === selectionNumbers.length) {
      endRange = items;
    }

    const newValue = { start: startRange, end: endRange };
    setvCurrentValue(newValue)

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: newValue }, true);
    }
  }

  const valueRangeToSelectedNumber = (value: SelectionNumber) => {
    if (value.start != undefined || value.end != undefined) {
      const currentDropdownDisplayVal = parseInt(currentDisplayAmount.value);
      const endNum = value.end;
      setSelectedNumber(Math.ceil(endNum / currentDropdownDisplayVal))
    }
  }

  // set rangevalue and return in valueOnChange function
  useEffect(() => {
    if (currentValue.start === undefined || currentValue.end === undefined) {
      updateValue(selectedNumber);
    }
    if (value.start != undefined || value.end != undefined) {
      valueRangeToSelectedNumber(value);
    }
  }, [value])

  return (
    <div className="ewc-pagination">
      <div className="ewc-pagination__info-container">
        <div className="ewc-pagination--displayText">{labelDisplaying}</div>
        <div className="ewc-pagination--dropdown">
          <Dropdown
            isCompact
            placeholder=""
            options={paginatorDropdownOptions}
            defaultValue={currentDisplayAmount}
            valueOnChange={(event: any) => onDropdownChangeHandler(event)}
          ></Dropdown>

        </div>
        <div className="ewc-pagination--pagesAmount"> {labelOf} {items} {label}</div>
      </div>
      <div className="ewc-pagination--selector-area">
        <button className={leftArrow} onClick={updateSelectedPageLeft}>
          <div className="ewc-pagination--selector__arrow--left"></div>
        </button>
        {showPaginationMenu ? <Paginators /> : null}
        <button className={rightArrow} onClick={updateSelectedPageRight}>
          <div className="ewc-pagination--selector__arrow--right"></div>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
