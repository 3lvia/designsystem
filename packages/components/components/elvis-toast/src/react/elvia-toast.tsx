import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BaseProps } from '@elvia/elvis-toolbox';

import { toastEventName, ToastWithId } from './elviaToast.types';
import { ToastPosition } from './styledComponents';
import { ToastBox } from './toastBox';
import { toastContainerId } from './publicApi.public';

export interface ToastProps extends BaseProps {}

export const Toast: React.FC<ToastProps> = ({ className, inlineStyle }) => {
  const [toastQueue, setToastQueue] = useState<ToastWithId[]>([]);

  const onClose = (): void => {
    setToastQueue((queue) => queue.slice(1));
  };

  const checkForMultipleToastComponents = (): void => {
    if (document.querySelectorAll('[data-elvia-toast-container]').length > 1) {
      console.error(
        'Multiple <elvia-toast> elements has been detected in your DOM. You should only add the component once to your application, preferably at root level. See the docs for details https://design.elvia.io/components/toast.',
      );
    }
  };

  useEffect(() => {
    checkForMultipleToastComponents();

    const addToastToQueue = (ev: CustomEvent<ToastWithId>): void => {
      setToastQueue((configs) => {
        const listClone = configs.slice();

        listClone.push({ ...ev.detail });
        return listClone;
      });
    };

    document.addEventListener(toastEventName, addToastToQueue);

    return () => document.removeEventListener(toastEventName, addToastToQueue);
  }, []);

  return createPortal(
    <ToastPosition id={toastContainerId} data-elvia-toast-container>
      {toastQueue.slice(0, 4).map((toast, index) => (
        <ToastBox
          onClose={onClose}
          toast={toast}
          indexInQueue={index}
          key={toast.id}
          className={className}
          inlineStyle={inlineStyle}
        />
      ))}
    </ToastPosition>,
    document.body,
  );
};

export default Toast;
