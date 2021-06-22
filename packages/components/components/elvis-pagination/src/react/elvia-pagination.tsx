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


  useEffect(() => {
    console.log(selectedNumber)
  }, [selectedNumber])


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


  // selectorBtns : numbers and arrows. 
  // const SelectorBtn = ({ ...props }) => {

  //   //////////////////////////////////////////////////
  //   // UPDATE LATER
  //   //////////////////////////////////////////////////

  //   // is NAN, to check for text in dropdown value. if text equals "all", do not return any selection options.
  //   if (isNaN(parseInt(currentDisplayAmount.value))) {
  //     console.log('hello there')
  //     // set selectorBT to display no buttons or arrows. 
  //   }
  //   //////////////////////////////////////////////////
  //   //////////////////////////////////////////////////

  // };

  const Paginators = ({ ...props }) => {

    const showtime = [];

    let firstNumbers;
    let centerNumbers;
    let lastNumbers;

    let firstCenter = false;
    let middleCenter = false;
    let lastCenter = false;

    // let firstNumberSolo = false;
    // let closeToEnd = false;
    // let isfirstDots = false;
    // let isLastDots = false;

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



      // første nummer når selection er 1. 
      if (currentSelectionNumber === 1 || currentSelectionNumber < selectionNumbers.length) {
        console.log('Ran first center');
        centerNumbers = selectionNumbers.map((number, index) => {

          if (number > 1 && number <= 6 && number !== selectionNumbers.length) {
            firstCenter = true;
            // do something with dots booleans here
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
      // middle numbers
      if (currentSelectionNumber >= 5 && firstCenter === false) {
        centerNumbers = selectionNumbers.map((number, index) => {

          // if (selectionNumbers.length > 6)
          console.log('MIDDLE:');

          if (number >= selectedNumber - 2 && number <= selectedNumber + 2 && number !== selectionNumbers.length) {
            middleCenter = true;

            // do something with dots booleans here
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
      // last numbers
      if (currentSelectionNumber >= selectionNumbers.length - 3 && middleCenter === false) {
        centerNumbers = selectionNumbers.map((number, index) => {

          // if (selectionNumbers.length > 6)

          if (number >= selectionNumbers.length - 5 && number !== selectionNumbers.length) {
            // do something with dots booleans here
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
    const getLastNumbers = (currentSelectionNumber: number) => {

      console.log('ran lastnUM')

      lastNumbers = selectionNumbers.map((number, index) => {
        if (number === selectionNumbers.length) {
          // do something with dots booleans here
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
    getFirstNumbers();
    getCenterNumbers(selectedNumber);
    getLastNumbers(selectedNumber);


    showtime.push(firstNumbers);
    showtime.push(centerNumbers);
    showtime.push(lastNumbers);


    return showtime;

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

  return (
    <div className="ewc-pagination">
      <div className="ewc-pagination--displayText">Viser</div>
      <div className="ewc-pagination--dropdown">
        <Dropdown
          isCompact
          placeholder=""
          options={itemsPerPage}
          defaultValue={currentDisplayAmount}
          valueOnChange={setCurrentDisplayAmount}
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

        <Paginators currentNumber={selectedNumber}></Paginators>

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


  // const SelectorBtn = ({ ...props }) => {
  //   return (
  //     <button className="ewc-pagination--selector-area__selector-btn">1</button>
  //   );
  // };

// useEffect(() => {
//   console.log('change current display amount, is now: ' + currentDisplayAmount)
// }, [currentDisplayAmount]);