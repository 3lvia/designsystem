import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseModalProps extends BaseProps {
  isShowing: boolean;
  heading?: string;
  content: JSX.Element;
  illustration?: JSX.Element;
  primaryButton?: JSX.Element;
  secondaryButton?: JSX.Element;
  hasCloseButton?: boolean;
  hasLockBodyScroll?: boolean;
  hasPadding?: boolean;
  disableClose?: boolean;
  disableBackdrop?: boolean;
  maxWidth?: string;
  onClose?: () => void;
}

export interface ModalProps extends BaseModalProps, ComponentPropsWithoutRef<'div'> {}
