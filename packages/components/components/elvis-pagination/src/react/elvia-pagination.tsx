import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import classNames from 'classnames';
import './style.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface SelectionNumber {
  start: string;
  label: string;
}

export interface PaginationProps {
  defaultSelection: SelectionNumber;
  items: number;
  label: string;
  itemsPerPage: Array<DropdownOption>;
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
  defaultSelection = [1, 10],
  items = 0,
  itemsPerPage = paginationOptions
}) => {

  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedRange, setSelectedRange] = useState([defaultSelection])



  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(itemsPerPage[0]);
  const [currentSelection, setCurrentSelection] = useState(1);

  // update selectedNumber based on range and amount of items
  useEffect(() => {
    console.log(selectedNumber)
  }, [currentDisplayAmount])

  // for testing
  // useEffect(() => {
  //   console.log(selectedNumber)
  // }, [selectedNumber])

  // calculate amount of selection numbers, based on total pages
  const selectorAmount = Math.ceil(items / parseInt(currentDisplayAmount.value));
  // create array from numbers
  const selectionNumbers = Array.from(Array(selectorAmount + 1).keys()).slice(1);

  // update selected number on arrow click
  const updateSelectedPageLeft = () => {
    setSelectedNumber(prevnumber => prevnumber - 1)
  }
  const updateSelectedPageRight = () => {
    setSelectedNumber(prevnumber => prevnumber + 1)
  }

  // Visible numbers in paginator
  const Paginators = () => {
    const visibleNumbers = [];
    let firstNumbers;
    let centerNumbers;
    let lastNumbers;

    let firstCenter = false;
    let middleCenter = false;

    const getFirstNumbers = () => {
      firstNumbers =
        < button
          className={`ewc-pagination--selector-area__selector-btn ${activeNumber(1) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
          key={1}
          onClick={() => setSelectedNumber(1)}
        > {1}
        </ button >;
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
                onClick={() => setSelectedNumber(number)}
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
                onClick={() => setSelectedNumber(number)}
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
                onClick={() => setSelectedNumber(number)}
              > {number}
              </ button >
            )
          }
        })
      }
    }
    const getLastNumbers = () => {
      lastNumbers = selectionNumbers.map((number, index) => {
        if (number === selectionNumbers.length) {
          return (
            < button
              className={`ewc-pagination--selector-area__selector-btn ${activeNumber(number) ? ' ewc-pagination--selector-area__selector--selected' : ''} `}
              key={index}
              onClick={() => setSelectedNumber(number)}
            > {number}
            </ button >
          )
        }
      })
    }
    // get visible numbers
    getFirstNumbers();
    getCenterNumbers(selectedNumber);
    getLastNumbers();
    visibleNumbers.push(firstNumbers, centerNumbers, lastNumbers);

    return visibleNumbers;
  }


  const activeNumber = (chosen: number) => {
    return selectedNumber === chosen;
  }

  const leftArrow = () => {
    return selectedNumber > 1;
  }

  const rightArrow = () => {
    return selectedNumber < selectionNumbers.length;
  }

  const onDropdownChangeHandler = (selectionRange: DropdownOption) => {
    setCurrentDisplayAmount(selectionRange);
    // Check if current selection number in avalailable selectionNumbers array
    const isSelectedInRange = selectionNumbers.includes(selectedNumber);
    // if not, update selectedNumber to higest
    if (!isSelectedInRange) {
      setSelectedNumber(selectionNumbers.length);
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

        {leftArrow() ?
          <button className="ewc-pagination--selector__arrow_btn" onClick={updateSelectedPageLeft}>
            <div className="ewc-pagination--selector__arrow--left"></div>
          </button>
          : null
        }

        <Paginators />

        {rightArrow() ?
          <button className="ewc-pagination--selector__arrow_btn" onClick={updateSelectedPageRight}>
            <div className="ewc-pagination--selector__arrow--right"></div>
          </button>
          : null
        }

      </div>
    </div>
  );
};

export default Pagination;
