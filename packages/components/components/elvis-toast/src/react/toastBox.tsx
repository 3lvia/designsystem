import { BaseProps, IconWrapper } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';
import { ToastConfig } from './elviaToast.types';
import { animationDuration, CloseButton, ToastBody, ToastContainer, ToastTitle } from './styledComponents';

import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { ToastIcon } from './toastIcon';

interface Props extends BaseProps {
  toast: ToastConfig;
  onClose: () => void;
}

export const ToastBox: React.FC<Props> = ({ toast, onClose, className, inlineStyle }) => {
  const [startFade, setStartFade] = useState(false);
  const timeoutId = useRef(0);

  const fadeOut = () => {
    setStartFade(true);

    setTimeout(() => {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
      onClose();
    }, animationDuration);
  };

  useEffect(() => {
    clearTimeout(timeoutId.current);
    setStartFade(false);

    timeoutId.current = window?.setTimeout(() => {
      fadeOut();
    }, Math.max(toast.duration - animationDuration, 0));
  }, [toast]);

  return (
    <ToastContainer
      className={className}
      style={inlineStyle}
      fade={startFade}
      toastType={toast.status}
      role="status"
    >
      <ToastIcon toast={toast} />

      <div>
        {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        {toast.body && <ToastBody>{toast.body}</ToastBody>}
      </div>

      {toast.closable && (
        <CloseButton onClick={fadeOut} size="sm">
          <IconWrapper icon={closeBold} size="xs" />
        </CloseButton>
      )}
    </ToastContainer>
  );
};
