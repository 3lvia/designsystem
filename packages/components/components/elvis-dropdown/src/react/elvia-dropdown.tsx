import React, { useEffect, useRef, useState } from 'react';

import { config } from './config';
import { DropdownProps, DropdownValue, GlobalDropdownProps } from './elviaDropdown.types';
import { warnDeprecatedProps, FormFieldLabel, IconButton, useConnectedOverlay } from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownInput } from './dropdown-input/dropdownInput';
import {
  Backdrop,
  DropdownContainer,
  DropdownInputContainer,
  IconRotator,
  OverlayPositioner,
} from './styledComponents';
import { DropdownError } from './error/dropdownError';
import { createPortal } from 'react-dom';

export const DropdownContext = React.createContext<
  GlobalDropdownProps & {
    onItemSelect: (value: string) => void;
    currentVal?: DropdownValue;
  }
>({
  onItemSelect: () => {
    return;
  },
});

const Dropdown: React.FC<DropdownProps> = ({
  dropdownOverlay,
  value = undefined,
  isCompact = false,
  isDisabled = false,
  isFullWidth = false,
  isSearchable = false,
  allOptionsSelectedLabel = 'Alle',
  label = '',
  errorMessage = '',
  menuPosition = 'auto',
  placeholder = '',
  placeholderIcon,
  hasSelectAllOption = false,
  isMulti = false,
  selectAllOption,
  noOptionsMessage = 'Ingen tilgjengelige valg',
  valueOnChange,
  hasLoadMoreItemsButton,
  onLoadMoreItems,
  isLoadingMoreItems,
  className,
  inlineStyle,
  webcomponent,
}) => {
  // warnDeprecatedProps(config, arguments[0]);

  const [currentVal, setCurrentVal] = useState(value);
  const [isError, setIsError] = useState(false);

  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openPopoverButtonRef = useRef<HTMLButtonElement>(null);
  const { isShowing, setIsShowing, updatePreferredPosition } = useConnectedOverlay(
    connectedElementRef,
    popoverRef,
    {
      offset: 8,
      horizontalPosition: 'center',
      verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
      alignWidths: true,
    },
  );

  const filterList = (value: string) => {
    console.log(value);
  };

  const setVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

    if (!isShowing) {
      openPopoverButtonRef.current?.focus();
    }
  };

  const setSelectedItem = (value: string): void => {
    console.log('here', value, currentVal, isMulti);
    if (isMulti && Array.isArray(currentVal)) {
      const arrayCopy = currentVal.slice();
      const existingIndex = arrayCopy.indexOf(value);
      if (existingIndex === -1) {
        arrayCopy.push(value);
      } else {
        arrayCopy.splice(existingIndex, 1);
      }
      setCurrentVal(arrayCopy);
    } else if (!isMulti && typeof currentVal === 'string') {
      setCurrentVal(value);
    }
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    /** We need to update the position, because the dimensions of the
     * overlay has changed.
     */
    setTimeout(() => {
      updatePreferredPosition();
    });
  }, [isShowing]);

  return (
    <DropdownContext.Provider
      value={{
        isCompact: isCompact,
        isMulti: isMulti,
        isDisabled: isDisabled,
        onItemSelect: (value) => setSelectedItem(value),
        currentVal: currentVal,
      }}
    >
      <DropdownContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
        data-testid="wrapper"
        role="combobox"
        aria-haspopup="true"
      >
        {!!label && <FormFieldLabel data-testid="label">{label}</FormFieldLabel>}
        <DropdownInputContainer
          ref={connectedElementRef}
          isDisabled={isDisabled}
          isActive={isShowing}
          isInvalid={isError}
          data-testid="input-container"
        >
          <DropdownInput
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            allOptionsAreSelected={false}
            onChange={filterList}
            editable={isSearchable}
          />
          <IconButton
            disabled={isDisabled}
            onClick={() => setVisibility(!isShowing)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'sm' : 'md'}
            data-testid="popover-toggle"
            aria-label="Åpne dropdown"
          >
            <IconRotator isRotated={isShowing}>
              <Icon
                name="arrowDown"
                color={isDisabled ? 'disabled' : 'black'}
                size={isCompact ? 'xs' : 'sm'}
              />
            </IconRotator>
          </IconButton>
        </DropdownInputContainer>
        {(isError || errorMessage) && <DropdownError errorText={errorMessage} />}
      </DropdownContainer>
      {isShowing &&
        createPortal(
          <>
            <Backdrop onClick={() => setVisibility(false)} />
            <OverlayPositioner ref={popoverRef}>{dropdownOverlay}</OverlayPositioner>
          </>,
          document.body,
        )}
    </DropdownContext.Provider>
  );
};

export default Dropdown;
