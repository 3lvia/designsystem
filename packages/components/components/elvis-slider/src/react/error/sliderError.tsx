import React, { useEffect, useState } from 'react';
import { ErrorContainer, ErrorText } from './errorStyles';
import { IconWrapper } from '@elvia/elvis-toolbox';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';

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
      <IconWrapper icon={removeCircle} color="error" size="xs" />
      <ErrorText>{errorText}</ErrorText>
    </ErrorContainer>
  );
};
