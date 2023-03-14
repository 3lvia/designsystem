import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps, useBreakpoint } from '@elvia/elvis-toolbox';
import { ToastConfig, toastEventName, ToastWithId } from './elviaToast.types';
import { ToastPosition } from './styledComponents';

import { ToastBox } from './toastBox';

let toastId = 0;

export const Toast: React.FC<BaseProps> = ({ className, inlineStyle }) => {
  const [toastQueue, setToastQueue] = useState<ToastWithId[]>([]);
  const gtMobile = useBreakpoint('gt-mobile');

  const onClose = (): void => {
    setToastQueue((queue) => queue.slice(1));
  };

  useEffect(() => {
    const addToastToQueue = (ev: CustomEvent<ToastConfig>): void => {
      setToastQueue((configs) => {
        const listClone = configs.slice();

        listClone.push({ ...ev.detail, id: toastId++ });
        return listClone;
      });
    };

    document.addEventListener(toastEventName, addToastToQueue);

    return () => document.removeEventListener(toastEventName, addToastToQueue);
  }, []);

  return createPortal(
    <ToastPosition gtMobile={gtMobile}>
      {toastQueue.slice(0, 4).map((toast, index) => (
        <ToastBox
          onClose={onClose}
          toast={toast}
          index={index}
          key={toast.id}
          gtMobile={gtMobile}
          className={className}
          inlineStyle={inlineStyle}
        />
      ))}
    </ToastPosition>,
    document.body,
  );
};

export default Toast;
