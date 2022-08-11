import React, { FC, useRef, useEffect, CSSProperties, useState } from 'react';
import {
  ModalCloseButton,
  ModalContent,
  ModalIllustration,
  Modal,
  ModalHeading,
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
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { config } from './config';

export interface ModalProps {
  isShowing: boolean;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `heading`.
   */
  title?: string;
  heading?: string;
  content: JSX.Element;
  illustration?: JSX.Element;
  primaryButton?: JSX.Element;
  secondaryButton?: JSX.Element;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `hasCloseButton`.
   */
  hasCloseBtn?: boolean;
  hasCloseButton?: boolean;
  hasLockBodyScroll?: boolean;
  hasPadding?: boolean;
  disableClose?: boolean;
  maxWidth?: string;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `onClose()`.
   */
  onHide?: () => void;
  onClose?: () => void;
  webcomponent?: ElvisComponentWrapper;
}

export const ModalComponent: FC<ModalProps> = function ({
  isShowing,
  heading,
  content,
  illustration,
  primaryButton,
  secondaryButton,
  className,
  inlineStyle,
  hasCloseButton = false,
  hasLockBodyScroll = true,
  hasPadding = true,
  disableClose = false,
  maxWidth,
  onClose,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);

  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const modalText = useRef<HTMLDivElement>(null);
  const modalIllustration = useRef<HTMLDivElement>(null);
  const modalPrimaryBtn = useRef<HTMLDivElement>(null);
  const modalSecondaryBtn = useRef<HTMLDivElement>(null);

  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);

  const hasIllustration = !!illustration || !!(webcomponent && !!webcomponent.getSlot('illustration'));
  const hasPrimaryButton = !!primaryButton || !!(webcomponent && !!webcomponent.getSlot('primaryButton'));
  const hasSecondaryButton =
    !!secondaryButton || !!(webcomponent && !!webcomponent.getSlot('secondaryButton'));

  /** Dispatch onClose events */
  const handleOnClose = (): void => {
    if (!isShowing) {
      return;
    }
    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.setProps({ isShowing: false }, true);
      webcomponent.triggerEvent('onClose');
    }
  };

  /**
   * Starts listener for click outside modal, closes modal when clicked
   * Starts listener for escape click, closes modal when clicked
   * Adds styling for locking scroll on body when modal open
   */
  !disableClose && useClickOutside(modalWrapperRef, () => isShowing && handleOnClose());
  useKeyPress('Escape', handleOnClose);
  hasLockBodyScroll && useLockBodyScroll(isShowing);

  /** When the modal is closed add focus back to the element that had focus when the modal was opened. */
  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;
    return () => {
      originalFocusedElement && originalFocusedElement.focus();
    };
  }, []);

  /** Get all slots and place them correctly */
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
      aria-label={heading}
      isShowing={isShowing}
      data-testid="modal-container"
      {...rest}
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
        {hasCloseButton && (
          <ModalCloseButton
            onClick={() => handleOnClose()}
            onMouseEnter={() => setIsHoveringCloseButton(true)}
            onMouseLeave={() => setIsHoveringCloseButton(false)}
            aria-label="Lukk modal"
            data-testid="modal-close-btn"
          >
            <Icon
              name="close"
              color={hasIllustration ? getColor('white') : undefined}
              inlineStyle={{ filter: isHoveringCloseButton && hasIllustration ? 'invert(1)' : undefined }}
            />
          </ModalCloseButton>
        )}

        <ModalContent hasIllustration={hasIllustration} hasPadding={hasPadding}>
          {heading && (
            <ModalHeading hasIllustration={hasIllustration} data-testid="modal-heading">
              {heading}
            </ModalHeading>
          )}

          {content && <ModalText data-testid="modal-content">{content}</ModalText>}
          {!content && <ModalText ref={modalText}></ModalText>}

          {(hasPrimaryButton || hasSecondaryButton) && (
            <ModalActions>
              {secondaryButton && (
                <secondaryButton.type {...secondaryButton.props} data-testid="modal-secondary-btn">
                  {secondaryButton.props.children}
                </secondaryButton.type>
              )}
              {webcomponent && hasSecondaryButton && (
                <div className="webComponentBtn" ref={modalSecondaryBtn}></div>
              )}
              {primaryButton ? (
                <primaryButton.type {...primaryButton.props} data-testid="modal-primary-btn">
                  {primaryButton.props.children}
                </primaryButton.type>
              ) : (
                !webcomponent && <div style={{ width: '50%' }}></div>
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
