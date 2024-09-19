import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { BaseProps, IconWrapper, useLanguage } from '@elvia/elvis-toolbox';
import React, { AnimationEvent, useEffect, useState } from 'react';

import { usePauseableTimer } from './pauseableTimer';
import { ToastWithId } from './publicApi.public';
import {
  CloseButton,
  IconContainer,
  TextContent,
  ToastBody,
  ToastContainer,
  ToastTitle,
  animationDuration,
  fadeOut as fadeOutKeyframes,
} from './styledComponents';
import { ToastIcon } from './toastIcon';

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
    if (ev.animationName === fadeOutKeyframes.name) {
      onClose();
    }
  };

  const lang = useLanguage();

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
      fade={startFade}
      index={indexInQueue}
      toastType={toast.status}
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
        <CloseButton
          onClick={fadeOut}
          size="sm"
          data-testid="close-btn"
          aria-label={lang === 'no' ? 'Lukk toast' : 'Close toast'}
        >
          <IconWrapper icon={closeBold} size="xs" />
        </CloseButton>
      )}
    </ToastContainer>
  );
};
