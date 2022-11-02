import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';

import { config } from './config';
import { DropdownProps } from './elviaDropdown.types';
import { warnDeprecatedProps, FormFieldLabel, useConnectedOverlay } from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownInput } from './dropdown-input/dropdownInput';
import { DropdownContainer, DropdownInputContainer, IconRotator } from './styledComponents';
import { DropdownError } from './error/dropdownError';
import { useWebComponentState } from '@elvia/elvis-toolbox';
import { DropdownOverlay } from './dropdown-overlay/dropdownOverlay';

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  value,
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
  isMulti = false,
  hasSelectAllOption = false,
  selectAllOption,
  noOptionsMessage = 'Ingen tilgjengelige valg',
  valueOnChange,
  hasLoadMoreItemsButton,
  onLoadMoreItems,
  isLoadingMoreItems,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  warnDeprecatedProps(config, rest);

  const [currentVal, setCurrentVal] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [pressedKey, setPressedKey] = useState<ReactKeyboardEvent<HTMLInputElement>>();

  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
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

  const setSelectedItem = (value: string): void => {
    if (isMulti) {
      const arrayCopy = Array.isArray(currentVal) ? currentVal.slice() : currentVal ? [currentVal] : [];
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
    updatePreferredPosition();

    const closeOnEsc = (ev: KeyboardEvent) => {
      if (ev.code === 'Escape') {
        setIsShowing(false);
      }
    };

    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [isShowing]);

  useEffect(() => {
    if (!filter) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [filter]);

  useEffect(() => {
    setTimeout(() => setFilteredItems(items)); //TODO: Can we get rid of it
  }, [items]);

  return (
    <>
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
          isCompact={isCompact}
          data-testid="input-container"
        >
          <DropdownInput
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            editable={isSearchable}
            onChange={(value) => setFilter(value)}
            dropdownIsOpen={isShowing}
            isDisabled={isDisabled}
            items={filteredItems}
            onOpenDropdown={() => setIsShowing(true)}
            onKeyPress={setPressedKey}
            currentVal={currentVal}
          />

          <IconRotator isRotated={isShowing}>
            <Icon
              name="arrowDownBold"
              color={isDisabled ? 'disabled' : 'black'}
              size={isCompact ? 'xs' : 'sm'}
            />
          </IconRotator>
        </DropdownInputContainer>
        {(isError || errorMessage) && <DropdownError errorText={errorMessage} />}
      </DropdownContainer>
      {isShowing && (
        <DropdownOverlay
          ref={popoverRef}
          noItemsText={noOptionsMessage}
          isMulti={isMulti}
          onItemSelect={setSelectedItem}
          isCompact={isCompact}
          onClose={() => setIsShowing(false)}
          items={filteredItems}
          pressedKey={pressedKey}
          currentVal={currentVal}
        />
      )}
    </>
  );
};

export default Dropdown;
