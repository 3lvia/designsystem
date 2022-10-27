import React, { useEffect, useRef, useState } from 'react';

import { config } from './config';
import { DropdownProps } from './elviaDropdown.types';
import {
  warnDeprecatedProps,
  FormFieldLabel,
  FormFieldInputContainer,
  IconButton,
  useConnectedOverlay,
} from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownContainer } from './dropdown/dropdownContainer';
import { DropdownInput } from './dropdown-input/dropdownInput';
import { DropdownInputContainer } from './styledComponents';

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  value = undefined,
  isCompact = false,
  isDisabled,
  isMulti,
  isFullWidth,
  isSearchable = false,
  hasSelectAllOption = false,
  selectAllOption,
  allOptionsSelectedLabel = 'Alle',
  label,
  errorMessage = '',
  menuPosition = 'auto',
  noOptionsMessage = 'Ingen tilgjengelige valg',
  placeholder = '',
  placeholderIcon,
  valueOnChange,
  onItemHover,
  hasLoadMoreItemsButton,
  onLoadMoreItems,
  isLoadingMoreItems,
  className,
  inlineStyle,
  webcomponent,
}) => {
  warnDeprecatedProps(config, arguments[0]);

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
      horizontalPosition: 'left-inside',
      verticalPosition: 'bottom',
      alignWidths: false,
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
    <>
      <DropdownInputContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
        data-testid="wrapper"
      >
        {!!label && <FormFieldLabel data-testid="label">{label}</FormFieldLabel>}
        <FormFieldInputContainer
          ref={connectedElementRef}
          isDisabled={isDisabled}
          isActive={isShowing}
          isInvalid={isError}
          data-testid="input-container"
        >
          <DropdownInput
            disabled={isDisabled}
            placeholder={placeholder}
            onChange={filterList}
            editable={isSearchable}
            isCompact={isCompact}
            value={currentVal}
          />
          <IconButton
            disabled={isDisabled}
            isActive={isShowing}
            onClick={() => setVisibility(!isShowing)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'sm' : 'md'}
            data-testid="popover-toggle"
            aria-label="Åpne datovelger"
            aria-haspopup="dialog"
          >
            <Icon name="calendar" color={isDisabled ? 'disabled' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </FormFieldInputContainer>
      </DropdownInputContainer>
      {isShowing && <DropdownContainer ref={popoverRef} />}
    </>
  );
};

export default Dropdown;
