/* eslint-disable @typescript-eslint/no-unused-vars */
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

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    const overlay = popoverRef.current?.firstChild;
    console.log(overlay);

    /** We need to update the position, because the dimensions of the
     * overlay has changed.
     */
    setTimeout(() => {
      updatePreferredPosition();
    });
  }, [isShowing]);

  return (
    <>
      <DropdownContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
        data-testid="wrapper"
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
            disabled={isDisabled}
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            allOptionsAreSelected={false}
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
            aria-label="Åpne dropdown"
            aria-haspopup="dialog"
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
            <p>Foo</p>
          </>,
          document.body,
        )}
    </>
  );
};

export default Dropdown;
