import { Icon } from '@elvia/elvis-icon/react';
import React, { useEffect, useState } from 'react';

import { ErrorContainer, ErrorText } from './errorStyles';

interface Props {
  errorText?: string;
  customText?: string;
  isCompact: boolean;
}

export const DatepickerError: React.FC<Props> = ({ errorText, customText, isCompact }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (customText) {
      setText(customText);
    } else if (errorText) {
      setText(errorText);
    }
  }, [errorText, customText]);

  return (
    <ErrorContainer>
      <Icon name="removeCircle" color="error" size="xs" />
      <ErrorText data-testid="error" isCompact={isCompact}>
        {text}
      </ErrorText>
    </ErrorContainer>
  );
};
