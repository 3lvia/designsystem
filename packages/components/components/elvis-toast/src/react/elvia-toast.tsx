import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps, useBreakpoint } from '@elvia/elvis-toolbox';
import { ToastConfig, toastEventName } from './elviaToast.types';
import { ToastPosition } from './styledComponents';

import { ToastBox } from './toastBox';

export const Toast: React.FC<BaseProps> = ({ className, inlineStyle }) => {
  const [toastQueue, setToastQueue] = useState<ToastConfig[]>([]);
  const gtMobile = useBreakpoint('gt-mobile');

  const onClose = (): void => {
    setToastQueue((queue) => queue.slice(1));
  };

  useEffect(() => {
    const addToastToQueue = (ev: CustomEvent<ToastConfig>): void => {
      setToastQueue((configs) => {
        const listClone = configs.slice();

        listClone.push(ev.detail);
        return listClone;
      });
    };

    document.addEventListener(toastEventName, addToastToQueue);

    return () => document.removeEventListener(toastEventName, addToastToQueue);
  }, []);

  return createPortal(
    <ToastPosition gtMobile={gtMobile}>
      {!!toastQueue.length && (
        <ToastBox
          onClose={() => onClose()}
          toast={toastQueue[0]}
          gtMobile={gtMobile}
          className={className}
          inlineStyle={inlineStyle}
        />
      )}
    </ToastPosition>,
    document.body,
  );
};

export default Toast;
