import { BaseProps, IconWrapper, useBreakpoint } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastConfig, toastEventName } from './elviaToast.types';
import { animationDuration, CloseButton, ToastBody, ToastContainer, ToastTitle } from './styledComponents';
import checkCircle from '@elvia/elvis-assets-icons/dist/icons/checkCircle';
import informationCircle from '@elvia/elvis-assets-icons/dist/icons/informationCircle';
import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { getThemeColor } from '@elvia/elvis-colors';

export const Toast: React.FC<BaseProps> = ({ className, inlineStyle }) => {
  const [config, setConfig] = useState<ToastConfig>();
  const [startFade, setStartFade] = useState(false);
  const gtMobile = useBreakpoint('gt-mobile');
  const timeoutId = useRef(0);

  const setConfigFromEvent = (ev: CustomEvent<ToastConfig>): void => {
    if (timeoutId.current !== 0) {
      fadeOut();
    }

    setConfig(ev.detail);
    setStartFade(false);

    timeoutId.current = window?.setTimeout(() => {
      fadeOut();
    }, Math.max(ev.detail.duration - animationDuration, 0));
  };

  const fadeOut = () => {
    setStartFade(true);
    setTimeout(closeToast, animationDuration);
  };

  const closeToast = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = 0;
    setConfig(undefined);
  };

  useEffect(() => {
    document.addEventListener(toastEventName, setConfigFromEvent);

    return () => document.removeEventListener(toastEventName, setConfigFromEvent);
  }, []);

  return createPortal(
    <>
      {config && (
        <ToastContainer
          className={className}
          style={{ ...inlineStyle }}
          gtMobile={gtMobile}
          fade={startFade}
          toastType={config.status}
          role="status"
        >
          {config.status === 'informative' ? (
            <IconWrapper icon={informationCircle} color={getThemeColor('text-primary')} size="md" />
          ) : (
            <IconWrapper icon={checkCircle} color={getThemeColor('state-on')} size="md" />
          )}
          <div>
            {config.title && <ToastTitle>{config.title}</ToastTitle>}
            {config.body && <ToastBody>{config.body}</ToastBody>}
          </div>
          {config.closable && (
            <CloseButton onClick={closeToast} size="sm">
              <IconWrapper icon={closeBold} size="xs" />
            </CloseButton>
          )}
        </ToastContainer>
      )}
    </>,
    document.body,
  );
};

export default Toast;
