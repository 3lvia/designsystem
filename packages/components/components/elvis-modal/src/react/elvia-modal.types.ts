import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseModalProps extends BaseProps {
  content: JSX.Element;
  disableBackdrop?: boolean;
  disableClose?: boolean;
  hasCloseButton?: boolean;
  hasLockBodyScroll?: boolean;
  hasPadding?: boolean;
  heading?: string | JSX.Element;
  illustration?: JSX.Element;
  isShowing: boolean;
  maxWidth?: string;
  primaryButton?: JSX.Element;
  secondaryButton?: JSX.Element;
  onClose?: () => void;
}

export interface ModalProps extends BaseModalProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
