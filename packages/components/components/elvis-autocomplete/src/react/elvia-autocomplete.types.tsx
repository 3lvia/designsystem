import { FormFieldSizes, BaseProps, HasValue, HasError } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface AutocompleteProps
  extends ComponentPropsWithoutRef<'div'>,
    BaseProps,
    HasValue<string>,
    HasError {
  items: [];
  size?: FormFieldSizes;
}
