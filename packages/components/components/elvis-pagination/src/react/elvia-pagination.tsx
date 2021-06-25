import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import classNames from 'classnames';
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
  label: string;
  itemsPerPage: Array<DropdownOption>;
  valueOnChange?: (value: SelectionNumber) => void;
  webcomponent?: any;
}
export const defaultPaginationOptions = [
  {
    value: '10',
    label: '10'
  }
]

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
  {
    value: 'Alle',
    label: 'Alle'
  },
];

const Pagination: FC<PaginationProps> = ({
  value = { start: undefined, end: undefined },
  items = 0,
  itemsPerPage = paginationOptions,
  valueOnChange,
  webcomponent
}) => {

  const [selectedNumber, setSelectedNumber] = useState(1);
  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(itemsPerPage[0]);
  const [showPaginationMenu, setShowPaginationMenu] = useState(true);

  // calculate amount of selection numbers, based on total pages
  let selectorAmount = Math.ceil(items / parseInt(currentDisplayAmount.value));
  if (isNaN(parseInt(currentDisplayAmount.value))) {
    selectorAmount = 0;
    setShowPaginationMenu(false)
  }
  // create array from numbers
  const selectionNumbers = Array.from(Array(selectorAmount + 1).keys()).slice(1);

  // update selected number on arrow click
  const updateSelectedPageLeft = () => {
    const newSelected = selectedNumber - 1
    updateValue(newSelected)
  }
  const updateSelectedPageRight = () => {
    const newSelected = selectedNumber + 1
    updateValue(newSelected)
  }

  const activeNumber = (chosenNumber: number) => {
    return selectedNumber === chosenNumber;
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

    const getFirstNumbers = () => {
      firstNumbers = < button
        className={`ewc-pagination--selector-area__selector-btn ${activeNumber(1) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
        key={'firstPaginationNumb'}
        onClick={() => updateValue(1)}
      > {1}
      </ button >
    }
    const getFirstDots = () => {
      if (selectedNumber >= 5 && selectionNumbers.length >= 8) {
        firstDots = <div key={'firstDots'}>...</div>;
      } else {
        firstDots = <div key={'noFirstDots'}></div>;
      }
    }
    const getCenterNumbers = (currentSelectionNumber: number) => {
      // Initiate when selected number is 1 or below 5
      if (currentSelectionNumber === 1 || currentSelectionNumber < 5) {
        centerNumbers = selectionNumbers.map((number, index) => {
          if (number > 1 && number <= 6 && number !== selectionNumbers.length) {
            firstCenter = true;
            return (
              < button
                className={`ewc-pagination--selector-area__selector-btn ${activeNumber(number) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
                key={index}
                onClick={() => updateValue(number)}
              > {number}
              </ button >
            )
          } else {
            firstCenter = false;
          }
        })
      }
      // if selected numbers is 2+/- away from first or last selectable number
      if (currentSelectionNumber >= 5 && firstCenter === false) {
        centerNumbers = selectionNumbers.map((number, index) => {
          if (number >= selectedNumber - 2 && number <= selectedNumber + 2 && number !== selectionNumbers.length && number !== 1) {
            middleCenter = true;
            return (
              < button
                className={`ewc-pagination--selector-area__selector-btn ${activeNumber(number) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
                key={index}
                onClick={() => updateValue(number)}
              > {number}
              </ button >
            )
          } else {
            middleCenter = false;
          }
        })
      }
      // If selected number is i proximity of last selectable number
      if (currentSelectionNumber >= selectionNumbers.length - 3 && middleCenter === false) {
        centerNumbers = selectionNumbers.map((number, index) => {
          if (number >= selectionNumbers.length - 5 && number !== selectionNumbers.length && number !== 1) {
            return (
              < button
                className={`ewc-pagination--selector-area__selector-btn ${activeNumber(number) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
                key={index}
                onClick={() => updateValue(number)}
              > {number}
              </ button >
            )
          }
        })
      }
    }
    const getLastDots = () => {

      if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 7) {
        lastDots = <div key={'lastDots'}>...</div>;
      } else {
        lastDots = <div key={'nolastDots'}></div>;
      }
    }
    const getLastNumbers = () => {
      lastNumbers = <button
        className={`ewc-pagination--selector-area__selector-btn ${activeNumber(selectionNumbers.length) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
        key={'lastPaginationNumb'}
        onClick={() => updateValue(selectionNumbers.length)}
      > {selectionNumbers.length}
      </ button >
    }

    // get visible numbers
    if (!isShowAll) {
      getFirstNumbers();
      getFirstDots();
      getCenterNumbers(selectedNumber);
      getLastDots();
      getLastNumbers();
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
      updateValue(selectionNumbers.length);
    }
  }

  // change and use currentValue
  const updateValue = (value: number) => {
    setSelectedNumber(value);
    // check if one??
    const startRange = (parseInt(currentDisplayAmount.value) * value) - parseInt(currentDisplayAmount.value);

    let endRange
    endRange = startRange + parseInt(currentDisplayAmount.value);
    if (value === selectionNumbers.length) {
      endRange = items;
    }

    const newValue = { start: startRange, end: endRange };

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: newValue }, true);
    }
  }

  return (
    <div className="ewc-pagination">
      <div className="ewc-pagination--displayText">Viser</div>
      <div className="ewc-pagination--dropdown">
        <Dropdown
          isCompact
          placeholder=""
          options={itemsPerPage}
          defaultValue={currentDisplayAmount}
          valueOnChange={(event: any) => onDropdownChangeHandler(event)}
        ></Dropdown>
      </div>
      <div className="ewc-pagination--pagesAmount">av {items} bilder</div>
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
