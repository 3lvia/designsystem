import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface ModalProps extends ComponentPropsWithoutRef<'div'>, BaseProps {
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
