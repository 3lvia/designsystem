import React, { useEffect, useMemo, useRef } from 'react';
import { AutocompleteItem, AutocompleteProps } from './elvia-autocomplete.types';
import {
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
  FormFieldInput,
  useWebComponentState,
  useConnectedOverlay,
} from '@elvia/elvis-toolbox';
import { AutocompleteOverlay } from './autocomplete-overlay/autocompleteOverlay';

export const Autocomplete: React.FC<AutocompleteProps> = function ({
  className,
  hasOptionalText = false,
  inlineStyle,
  isDisabled = false,
  isFullWidth = false,
  items = [],
  label,
  menuPosition = 'auto',
  placeholder,
  size = 'medium',
  value = '',
  valueOnChange,
  webcomponent,
  ...rest
}) {
  const [currentValue, setCurrentValue] = useWebComponentState(value, 'value', webcomponent, valueOnChange);

  const connectedElementRef = useRef<HTMLLabelElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
    alignWidths: true,
  });

  const calculateItemRelevance = (itemLabel: string, filter: string[]): number => {
    const normalizedItemLabel = itemLabel.toLowerCase();

    let relevance = 0;
    for (const filterItem of filter) {
      const normalizedFilterItem = filterItem.toLowerCase();

      // Higher relevance for exact matches, then starts with, then includes
      if (normalizedItemLabel === normalizedFilterItem) {
        relevance += 3;
      } else if (normalizedItemLabel.startsWith(normalizedFilterItem)) {
        relevance += 2;
      } else if (normalizedItemLabel.includes(normalizedFilterItem)) {
        relevance += 1;
      }
    }
    return relevance;
  };

  const filterItems = (items: AutocompleteItem[], filter: string, limit: number): AutocompleteItem[] | [] => {
    const normalizedFilter: string[] = filter.toLowerCase().trim().split(/\s+/);

    if (!filter) {
      return [];
    }

    const scoredItems = items
      .filter((item) => normalizedFilter.some((filterWord) => item.label.toLowerCase().includes(filterWord)))
      .map((item) => ({
        item,
        relevance: calculateItemRelevance(item.label, normalizedFilter),
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit)
      .map((scoredItem) => scoredItem.item);

    return scoredItems;
  };

  const filteredItems = useMemo(() => filterItems(items, currentValue ?? '', 6), [items, currentValue]);

  const handleChange = (event: { target: { value: React.SetStateAction<string | null> } }) => {
    setCurrentValue(event.target.value);
    setIsShowing(!!event.target.value);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      <FormFieldContainer
        size={size}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        className={className}
        ref={connectedElementRef}
        style={{ ...inlineStyle }}
        {...rest}
      >
        {(!!label || !!hasOptionalText) && (
          <FormFieldLabel hasOptionalText={hasOptionalText}>{label}</FormFieldLabel>
        )}
        <FormFieldInputContainer>
          <FormFieldInput
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={handleChange}
            value={currentValue ?? ''}
            onFocus={() => currentValue && setIsShowing(true)}
          />
        </FormFieldInputContainer>
      </FormFieldContainer>
      {isShowing && (
        <AutocompleteOverlay
          ref={popoverRef}
          filteredItems={filteredItems}
          size={size}
          onClose={() => setIsShowing(false)}
          value={currentValue}
        ></AutocompleteOverlay>
      )}
    </>
  );
};

export default Autocomplete;
