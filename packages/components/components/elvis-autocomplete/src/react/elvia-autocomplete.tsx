import React from 'react';
import { AutocompleteProps } from './elvia-autocomplete.types';

export const Autocomplete: React.FC<AutocompleteProps> = function ({
  items = [],
  size = 'medium',
  className,
  inlineStyle,
  ...rest
}) {
  return (
    <p className={className ?? ''} style={inlineStyle} {...rest}>
      hello i am {size} auto complete with {items.length} items
    </p>
  );
};

export default Autocomplete;
