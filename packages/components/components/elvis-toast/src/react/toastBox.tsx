import { BaseProps, IconWrapper } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';
import { ToastWithId } from './elviaToast.types';
import {
  animationDuration,
  CloseButton,
  TextContent,
  ToastBody,
  ToastContainer,
  ToastTitle,
} from './styledComponents';

import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { ToastIcon } from './toastIcon';

interface Props extends BaseProps {
  toast: ToastWithId;
  gtMobile: boolean;
  index: number;
  onClose: () => void;
}

export const ToastBox: React.FC<Props> = ({ toast, gtMobile, index, onClose, className, inlineStyle }) => {
  const [startFade, setStartFade] = useState(false);
  const openTimeoutId = useRef(0);
  const fadeAnimationId = useRef(0);

  const fadeOut = () => {
    setStartFade(true);

    fadeAnimationId.current = window?.setTimeout(() => {
      clearTimeout(openTimeoutId.current);
      openTimeoutId.current = 0;
      onClose();
    }, animationDuration);
  };

  useEffect(() => {
    if (index === 0) {
      clearTimeout(openTimeoutId.current);
      setStartFade(false);

      openTimeoutId.current = window?.setTimeout(() => {
        fadeOut();
      }, Math.max(toast.duration - animationDuration, 0));
    }
  }, [index]);

  useEffect(
    () => () => {
      clearTimeout(openTimeoutId.current);
      clearTimeout(fadeAnimationId.current);
    },
    [],
  );

  return (
    <ToastContainer
      className={className}
      style={inlineStyle}
      fade={startFade}
      index={index}
      gtMobile={gtMobile}
      toastType={toast.status}
      role="status"
    >
      <ToastIcon toast={toast} />

      <TextContent>
        {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        {toast.body && <ToastBody>{toast.body}</ToastBody>}
      </TextContent>

      {toast.closable && (
        <CloseButton onClick={fadeOut} size="sm" data-testid="close-btn">
          <IconWrapper icon={closeBold} size="xs" />
        </CloseButton>
      )}
    </ToastContainer>
  );
};
