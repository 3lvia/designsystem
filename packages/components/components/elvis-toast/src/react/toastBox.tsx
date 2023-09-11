import { BaseProps, IconWrapper } from '@elvia/elvis-toolbox';
import React, { AnimationEvent, useEffect, useState } from 'react';
import { ToastWithId } from './elviaToast.types';
import {
  animationDuration,
  CloseButton,
  TextContent,
  ToastBody,
  ToastContainer,
  ToastTitle,
  IconContainer,
  fadeOut as fadeOutKeyframes,
} from './styledComponents';

import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { ToastIcon } from './toastIcon';
import { usePauseableTimer } from './pauseableTimer';

interface Props extends BaseProps {
  toast: ToastWithId;
  indexInQueue: number;
  onClose: () => void;
}

export const ToastBox: React.FC<Props> = ({ toast, indexInQueue, onClose, className, inlineStyle }) => {
  const [startFade, setStartFade] = useState(false);

  const fadeOut = () => {
    setStartFade(true);
  };

  const { startTimer, resumeTimer, pauseTimer, clearTimer } = usePauseableTimer(
    fadeOut,
    Math.max(toast.duration - animationDuration, 0),
  );

  const onAnimationEnd = (ev: AnimationEvent<HTMLOutputElement>): void => {
    if (ev.animationName === fadeOutKeyframes.getName()) {
      onClose();
    }
  };

  useEffect(() => {
    if (indexInQueue === 0) {
      setStartFade(false);

      startTimer();
    }
  }, [indexInQueue]);

  useEffect(() => clearTimer, []);

  return (
    <ToastContainer
      className={className}
      style={inlineStyle}
      $fade={startFade}
      $index={indexInQueue}
      $toastType={toast.status}
      role="status"
      data-elvia-toast-id={toast.id}
      onMouseEnter={() => indexInQueue === 0 && pauseTimer()}
      onMouseLeave={() => indexInQueue === 0 && resumeTimer()}
      onAnimationEnd={onAnimationEnd}
    >
      <IconContainer>
        <ToastIcon toast={toast} />
      </IconContainer>

      <TextContent>
        {!!toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        {!!toast.body && <ToastBody>{toast.body}</ToastBody>}
      </TextContent>

      {toast.closable && (
        <CloseButton onClick={fadeOut} $size="sm" data-testid="close-btn" aria-label="Lukk toast">
          <IconWrapper icon={closeBold} size="xs" />
        </CloseButton>
      )}
    </ToastContainer>
  );
};
