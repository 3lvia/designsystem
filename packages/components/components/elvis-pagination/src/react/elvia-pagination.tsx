import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import * as StyledPaginator from './styledComponents';

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
  dropdownMenuPos: string;
  isRightAligned?: boolean;
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
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '40',
    label: '40',
  },
];

const Pagination: FC<PaginationProps> = ({
  value = { start: undefined, end: undefined },
  items = 0,
  isRightAligned = false,
  dropdownMenuPos = 'bottom',
  paginatorDropdownOptions = paginationOptions,
  label = 'elementer',
  labelDisplaying = 'Viser',
  labelOf = 'av',
  valueOnChange,
  webcomponent,
}) => {
  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(paginatorDropdownOptions[0]);
  const [showPaginationMenu, setShowPaginationMenu] = useState(true);
  const [currentValue, setCurrentValue] = useState(value);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedNumber, setSelectedNumber] = useState(1);

  useEffect(() => {
    updateValue(selectedNumber);
  }, [selectedNumber, currentDisplayAmount]);

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
    setShowPaginationMenu(false);
  }
  // create array from numbers
  const selectionNumbers = Array.from(Array(selectorAmount + 1).keys()).slice(1);

  const activeNumber = (chosenNumber: number): boolean => {
    return selectedNumber === chosenNumber;
  };
  // update selected number on arrow click
  const updateSelectedPageLeft = (): void => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn - 1);
  };
  const updateSelectedPageRight = (): void => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn + 1);
  };

  const isLeftArrow = (): boolean => {
    if (showPaginationMenu) {
      return selectedNumber > 1;
    }
    return false;
  };
  const isRightArrow = (): boolean => {
    if (showPaginationMenu) {
      return selectedNumber < selectionNumbers.length;
    }
    return false;
  };

  // Visible numbers in paginator
  const Paginators = (): JSX.Element => {
    const visibleNumbers = [];
    const isShowAll = false;
    const isMobile = windowWidth < 768;

    const PaginatorNumber = (
      NumberInArray: number,
      indexNumber: number,
    ) => {
      return (
        [
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        ]
      )
    };

    // helper functions to determine what numbers get added to visible array 
    const getNumbersWhenSelectedBetween1and5 = (selectionNumber: number): boolean => {
      return selectionNumber === 1 || selectionNumber < 5;
    };

    const centerNumbersWhenBetween1And5DisplayCheck = (
      numberInArray: number,
      SelectionArrayLenght: number,
      maxValue: number
    ): boolean => {
      if (
        numberInArray > 1 &&
        numberInArray <= maxValue &&
        numberInArray !== SelectionArrayLenght
      ) {
        return true;
      }
      return false;
    }

    const centerNumbersWhenBetween1And5 = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {

      if (
        centerNumbersWhenBetween1And5DisplayCheck(NumberInArray, SelectionArrayLenght, 6) && !mobile
      ) {
        return (
          PaginatorNumber(NumberInArray, indexNumber)
        );
      } else if (
        centerNumbersWhenBetween1And5DisplayCheck(NumberInArray, SelectionArrayLenght, 4) &&
        mobile &&
        selectedNumber !== 4
      ) {
        return (
          PaginatorNumber(NumberInArray, indexNumber)
        );
      } else if (
        mobile &&
        selectedNumber === 4 &&
        NumberInArray >= selectedNumber - 1 &&
        NumberInArray <= selectedNumber + 1 &&
        NumberInArray < 6
      ) {
        return (
          PaginatorNumber(NumberInArray, indexNumber)
        );
      }
      return [];
    };

    const centerNumbersWhenLeast5OrHigherDisplayCheck = (
      numberInArray: number,
      SelectionArrayLenght: number,
      proximityRange: number,
    ): boolean => {

      if (
        numberInArray >= selectedNumber - proximityRange &&
        numberInArray <= selectedNumber + proximityRange &&
        numberInArray !== SelectionArrayLenght &&
        numberInArray !== 1
      ) {
        return true;
      }
      return false;
    }

    const centerNumbersWhenLeast5OrHigher = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {

      if (centerNumbersWhenLeast5OrHigherDisplayCheck(NumberInArray, SelectionArrayLenght, 2) && !mobile) {
        return PaginatorNumber(NumberInArray, indexNumber)
      } else if (
        (centerNumbersWhenLeast5OrHigherDisplayCheck(NumberInArray, SelectionArrayLenght, 1) && mobile)) {
        return PaginatorNumber(NumberInArray, indexNumber)
      }
      return [];
    };

    const isSelectedNumberNearEnd = (selectionNumber: number) => {
      return selectionNumber >= selectionNumbers.length - 2;
    };


    const getNumbersWhenInProximityOfLastNumberDisplayCheck = (
      numberInArray: number,
      SelectionArrayLenght: number,
      proximityRange: number,
    ): boolean => {

      if (
        numberInArray >= SelectionArrayLenght - proximityRange &&
        numberInArray !== SelectionArrayLenght &&
        numberInArray !== 1
      ) {
        return true;
      }
      return false;
    }



    const getNumbersWhenInProximityOfLastNumber = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (
        getNumbersWhenInProximityOfLastNumberDisplayCheck(NumberInArray, SelectionArrayLenght, 5) && !mobile

      ) {
        return PaginatorNumber(NumberInArray, indexNumber)
      } else if (
        getNumbersWhenInProximityOfLastNumberDisplayCheck(NumberInArray, SelectionArrayLenght, 3) && mobile
      ) {
        return PaginatorNumber(NumberInArray, indexNumber)
      }
      return [];
    };

    // funtions that return jsx elements in form of visible numbers to the selectorArray
    const getFirstNumber = () => {
      return (
        <StyledPaginator.PaginatorNumber
          selected={activeNumber(1)}
          isFirst={true}
          key={'firstPaginationNumber'}
          onClick={() => setSelectedNumber(1)}
        >
          {1}
        </StyledPaginator.PaginatorNumber>
      );
    };

    const getFirstDots = () => {
      let noDots = true;
      let key = 'noShowFirstDots'
      if (selectedNumber >= 5 && selectionNumbers.length >= 8 && !isMobile) {
        noDots = false;
        key = 'firstDots';
      } else if (selectedNumber >= 4 && selectionNumbers.length >= 5 && isMobile) {
        noDots = false;
        key = 'firstDotsMobile';
      }
      return <StyledPaginator.PaginatorDots key={key} noDots={noDots}>...</StyledPaginator.PaginatorDots>;
    };

    const getCenterNumbers = (): Array<any> => {
      // Initiate when selected number is 1 or below 5
      if (getNumbersWhenSelectedBetween1and5(selectedNumber)) {
        return selectionNumbers.map((number, index) => {
          return [centerNumbersWhenBetween1And5(number, selectionNumbers.length, isMobile, index)];
        });
      }
      // if currentSelection is at least 5 or higher
      if (selectedNumber >= 5 && selectedNumber < selectionNumbers.length - 2) {
        return selectionNumbers.map((number, index) => {
          // if selected numbers is 2+/- away from first or last selectable number
          return [centerNumbersWhenLeast5OrHigher(number, selectionNumbers.length, isMobile, index)];
        });
      }
      // If selected number is i proximity of last selectable number
      if (isSelectedNumberNearEnd(selectedNumber)) {
        return selectionNumbers.map((number, index) => {
          return [getNumbersWhenInProximityOfLastNumber(number, selectionNumbers.length, isMobile, index)];
        });
      }

      return [<StyledPaginator.PaginatorNumber key={'noShowCenterumbers'} noShow={true} ></StyledPaginator.PaginatorNumber>]
    };
    const getLastDots = () => {
      let noDots = true;
      let key = 'noShowLastDots';
      if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 7 && !isMobile) {
        noDots = false;
        key = 'lastDots';
      } else if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 5 && isMobile) {
        noDots = false;
        key = 'lastDotsMobile';
      }
      return <StyledPaginator.PaginatorDots key={key} noDots={noDots}>...</StyledPaginator.PaginatorDots>;
    };
    const getLastNumber = () => {
      return (
        <StyledPaginator.PaginatorNumber
          selected={activeNumber(selectionNumbers.length)}
          isLast={true}
          key={'lastPaginationNumber'}
          onClick={() => setSelectedNumber(selectionNumbers.length)}
        >
          {selectionNumbers.length}
        </StyledPaginator.PaginatorNumber>
      );
    };

    // get visible numbers
    if (!isShowAll) {
      const firstNumbers = getFirstNumber();
      const firstDots = getFirstDots();
      const centerNumbers = getCenterNumbers();
      const lastDots = getLastDots();
      const lastNumbers = getLastNumber();
      visibleNumbers.push(firstNumbers, firstDots);
      centerNumbers.map((paginatorNumbers) => {
        if (paginatorNumbers.length != 0) {
          visibleNumbers.push(paginatorNumbers);
        }
      })
      visibleNumbers.push(lastDots, lastNumbers);
    }
    return (
      < StyledPaginator.PaginatorNumbersArea>
        {visibleNumbers}
      </StyledPaginator.PaginatorNumbersArea>
    );
  };

  const onDropdownChangeHandler = (selectionRange: DropdownOption) => {
    if (isNaN(parseInt(selectionRange.value)) || items === 0) {
      setShowPaginationMenu(false);
      return;
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
  };

  // set rangevalue and return in valueOnChange function
  const updateValue = (value: number) => {
    if (!selectionNumbers.includes(value)) {
      return;
    }

    const startRange =
      parseInt(currentDisplayAmount.value) * value - parseInt(currentDisplayAmount.value) + 1;
    let endRange;
    endRange = startRange + parseInt(currentDisplayAmount.value) - 1;
    if (value === selectionNumbers.length) {
      endRange = items;
    }

    const newValue = { start: startRange, end: endRange };
    setCurrentValue(newValue);

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: newValue }, true);
    }
  };

  const valueRangeToSelectedNumber = (value: SelectionNumber) => {
    if (value.start != undefined || value.end != undefined) {
      const currentDropdownDisplayVal = parseInt(currentDisplayAmount.value);
      const endNum = value.end;
      setSelectedNumber(Math.ceil(endNum / currentDropdownDisplayVal));
    }
  };

  // set rangevalue and return in valueOnChange function
  useEffect(() => {
    if (currentValue.start === undefined || currentValue.end === undefined) {
      updateValue(selectedNumber);
    }
    if (value.start != undefined || value.end != undefined) {
      valueRangeToSelectedNumber(value);
    }
  }, [value]);

  return (
    <StyledPaginator.Pagination isRightAligned={isRightAligned}>
      <StyledPaginator.InfoContainer>
        <StyledPaginator.InfoText>{labelDisplaying}</StyledPaginator.InfoText>
        <StyledPaginator.InfoDropdown>
          <Dropdown
            isCompact
            placeholder=""
            options={paginatorDropdownOptions}
            menuPosition={dropdownMenuPos}
            defaultValue={currentDisplayAmount}
            valueOnChange={(event: any) => onDropdownChangeHandler(event)}
          ></Dropdown>
        </StyledPaginator.InfoDropdown>
        <StyledPaginator.InfoAmount isMobile={windowWidth < 768}>
          {labelOf} {items} {label}
        </StyledPaginator.InfoAmount>
      </StyledPaginator.InfoContainer>
      <StyledPaginator.SelectorArea>
        <StyledPaginator.SelectorArrowBtn visible={isLeftArrow()} onClick={updateSelectedPageLeft}>
          <StyledPaginator.SelectorArrowLeft />
        </StyledPaginator.SelectorArrowBtn>
        {showPaginationMenu ? <Paginators /> : null}
        <StyledPaginator.SelectorArrowBtn visible={isRightArrow()} onClick={updateSelectedPageRight}>
          <StyledPaginator.SelectorRighArrow />
        </StyledPaginator.SelectorArrowBtn>
      </StyledPaginator.SelectorArea>
    </StyledPaginator.Pagination>
  );
};

export default Pagination;
