import { Icon } from '@elvia/elvis-icon/react';
import React, { useEffect, useState } from 'react';
import { ErrorContainer, ErrorText } from './errorStyles';

interface SliderErrorProps {
  errorMessage: string | undefined;
  id: string | undefined;
}

export const SliderError: React.FC<SliderErrorProps> = ({ errorMessage }) => {
  const [errorText, setErrorText] = useState(errorMessage);

  useEffect(() => {
    setErrorText(errorMessage);
  }, [errorMessage]);

  return (
    <ErrorContainer>
      <Icon name="removeCircle" color="error" size="xs" />
      <ErrorText>{errorText}</ErrorText>
    </ErrorContainer>
  );
};
