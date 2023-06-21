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
  IconContainer,
} from './styledComponents';

import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { ToastIcon } from './toastIcon';
import { usePauseableTimer } from './pauseableTimer';

interface Props extends BaseProps {
  toast: ToastWithId;
  gtMobile: boolean;
  indexInQueue: number;
  onClose: () => void;
}

export const ToastBox: React.FC<Props> = ({
  toast,
  gtMobile,
  indexInQueue,
  onClose,
  className,
  inlineStyle,
}) => {
  const [startFade, setStartFade] = useState(false);
  const fadeAnimationId = useRef(0);

  const fadeOut = () => {
    setStartFade(true);

    fadeAnimationId.current = window?.setTimeout(() => {
      onClose();
    }, animationDuration);
  };

  const { startTimer, resumeTimer, pauseTimer, clearTimer } = usePauseableTimer(
    fadeOut,
    Math.max(toast.duration - animationDuration, 0),
  );

  useEffect(() => {
    if (indexInQueue === 0) {
      setStartFade(false);

      startTimer();
    }
  }, [indexInQueue]);

  useEffect(
    () => () => {
      clearTimer();
      clearTimeout(fadeAnimationId.current);
    },
    [],
  );

  return (
    <ToastContainer
      className={className}
      style={inlineStyle}
      fade={startFade}
      index={indexInQueue}
      gtMobile={gtMobile}
      toastType={toast.status}
      role="status"
      data-elvia-toast-id={toast.id}
      onMouseEnter={() => indexInQueue === 0 && pauseTimer()}
      onMouseLeave={() => indexInQueue === 0 && resumeTimer()}
    >
      <IconContainer>
        <ToastIcon toast={toast} />
      </IconContainer>

      <TextContent>
        {!!toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        {!!toast.body && <ToastBody>{toast.body}</ToastBody>}
      </TextContent>

      {toast.closable && (
        <CloseButton onClick={fadeOut} size="sm" data-testid="close-btn" aria-label="Lukk toast">
          <IconWrapper icon={closeBold} size="xs" />
        </CloseButton>
      )}
    </ToastContainer>
  );
};
