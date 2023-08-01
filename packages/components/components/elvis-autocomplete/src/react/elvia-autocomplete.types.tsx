import { FormFieldSizes, BaseProps, HasValue, HasError } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type AutocompleteMenuPosition = 'top' | 'bottom' | 'auto';
export type ErrorType = 'required';

export interface AutocompleteItem {
  value: string | null;
  label: string;
}

export interface AutocompleteProps
  extends ComponentPropsWithoutRef<'label'>,
    BaseProps,
    HasValue<string | null>,
    HasError {
  ariaLabel?: string;
  hasOptionalText?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isRequired?: boolean;
  items: AutocompleteItem[];
  label?: string;
  menuPosition?: AutocompleteMenuPosition;
  onClose?: () => void;
  onFocus?: () => void;
  onItemSelect?: (value: string | null) => void;
  onOpen?: () => void;
  placeholder?: string;
  size?: FormFieldSizes;
  useBuiltInFilter?: boolean;
}
