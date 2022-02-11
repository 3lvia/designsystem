import React, { FC, useRef, useEffect, CSSProperties } from 'react';
import {
  ModalCloseButton,
  ModalContent,
  ModalIllustration,
  Modal,
  ModalTitle,
  ModalWrapper,
  ModalText,
  ModalActions,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { getColor } from '@elvia/elvis-colors';
import { useClickOutside } from './useClickOutside';
import { useKeyPress } from './useKeyPress';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useFocusTrap } from './useFocusTrap';

export interface ModalProps {
  isShowing: boolean;
  title?: string;
  content: HTMLElement;
  illustration?: HTMLElement;
  primaryButton?: HTMLElement;
  secondaryButton?: HTMLElement;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  hasCloseBtn?: boolean;
  hasLockBodyScroll?: boolean;
  disableClose?: boolean;
  maxWidth?: string;
  onHide: () => void;
  webcomponent?: any;
}

export const ModalComponent: FC<ModalProps> = ({
  isShowing,
  title,
  content,
  illustration,
  primaryButton,
  secondaryButton,
  className,
  inlineStyle,
  hasCloseBtn = false,
  hasLockBodyScroll = true,
  disableClose = false,
  maxWidth,
  onHide,
  webcomponent,
}) => {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const modalText = useRef<HTMLDivElement>(null);
  const modalIllustration = useRef<HTMLDivElement>(null);
  const modalPrimaryBtn = useRef<HTMLDivElement>(null);
  const modalSecondaryBtn = useRef<HTMLDivElement>(null);

  const hasIllustration = !!illustration || (webcomponent && !!webcomponent.getSlot('illustration'));
  const hasPrimaryButton = !!primaryButton || (webcomponent && !!webcomponent.getSlot('primaryButton'));
  const hasSecondaryButton = !!secondaryButton || (webcomponent && !!webcomponent.getSlot('secondaryButton'));

  const handleOnHide = () => {
    if (!isShowing) {
      return;
    }
    if (disableClose) {
      return;
    }
    if (!webcomponent && onHide) {
      onHide();
    } else if (webcomponent) {
      webcomponent.setProps({ isShowing: false }, true);
      webcomponent.triggerEvent('onHide');
    }
  };

  useClickOutside(modalWrapperRef, () => isShowing && handleOnHide());
  useKeyPress('Escape', handleOnHide);
  hasLockBodyScroll && useLockBodyScroll(isShowing);

  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;

    return () => {
      originalFocusedElement && originalFocusedElement.focus();
    };
  }, []);

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    if (!webcomponent) {
      useFocusTrap(modalWrapperRef);
      return;
    }

    if (modalText.current && webcomponent.getSlot('content')) {
      modalText.current.innerHTML = '';
      modalText.current.appendChild(webcomponent.getSlot('content'));
    }

    if (modalIllustration.current && webcomponent.getSlot('illustration')) {
      modalIllustration.current.innerHTML = '';
      modalIllustration.current.appendChild(webcomponent.getSlot('illustration'));
    }

    if (modalPrimaryBtn.current && webcomponent.getSlot('primaryButton')) {
      modalPrimaryBtn.current.innerHTML = '';
      modalPrimaryBtn.current.appendChild(webcomponent.getSlot('primaryButton'));
    }

    if (modalSecondaryBtn.current && webcomponent.getSlot('secondaryButton')) {
      modalSecondaryBtn.current.innerHTML = '';
      modalSecondaryBtn.current.appendChild(webcomponent.getSlot('secondaryButton'));
    }

    useFocusTrap(modalWrapperRef);

    return () => {
      useFocusTrap(modalWrapperRef, true);
    };
  }, [isShowing]);

  return (
    <Modal
      aria-modal
      tabIndex={-1}
      role="dialog"
      aria-label={title}
      isShowing={isShowing}
      data-testid="modal-container"
    >
      <ModalWrapper
        ref={modalWrapperRef}
        hasIllustration={hasIllustration}
        className={className}
        style={inlineStyle}
        maxWidth={maxWidth}
        data-testid="modal-wrapper"
      >
        {illustration && (
          <ModalIllustration data-testid="modal-illustration">{illustration}</ModalIllustration>
        )}
        {!illustration && hasIllustration && <ModalIllustration ref={modalIllustration}></ModalIllustration>}
        {hasCloseBtn && (
          <ModalCloseButton
            hasIllustration={hasIllustration}
            onClick={() => handleOnHide()}
            aria-label="Lukk modal"
            data-testid="modal-close-btn"
          >
            <Icon name="close" color={getColor('white')} className="ewc-close-icon" />
          </ModalCloseButton>
        )}

        <ModalContent hasIllustration={hasIllustration}>
          {title && (
            <ModalTitle hasIllustration={hasIllustration} data-testid="modal-title">
              {title}
            </ModalTitle>
          )}

          {content && <ModalText data-testid="modal-content">{content}</ModalText>}
          {!content && <ModalText ref={modalText}></ModalText>}

          {(hasPrimaryButton || hasSecondaryButton) && (
            <ModalActions>
              {secondaryButton && (
                <>
                  <div data-testid="modal-secondary-btn">{secondaryButton}</div>
                </>
              )}
              {webcomponent && hasSecondaryButton && (
                <div className="webComponentBtn" ref={modalSecondaryBtn}></div>
              )}
              {primaryButton && (
                <>
                  <div data-testid="modal-primary-btn">{primaryButton}</div>
                </>
              )}
              {webcomponent && <div className="webComponentBtn" ref={modalPrimaryBtn}></div>}
            </ModalActions>
          )}
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
};

export default ModalComponent;
