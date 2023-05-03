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
import { getThemeColor } from '@elvia/elvis-colors';
import { useClickOutside } from './useClickOutside';
import { useKeyPress } from './useKeyPress';
import { useLockBodyScroll } from './useLockBodyScroll';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { warnDeprecatedProps, useFocusTrap, useSlot, IconWrapper } from '@elvia/elvis-toolbox';
import close from '@elvia/elvis-assets-icons/dist/icons/close';
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
  inlineStyle?: CSSProperties;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `hasCloseButton`.
   */
  hasCloseBtn?: boolean;
  hasCloseButton?: boolean;
  hasLockBodyScroll?: boolean;
  hasPadding?: boolean;
  disableClose?: boolean;
  disableBackdrop?: boolean;
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
  disableBackdrop = false,
  maxWidth,
  onClose,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);

  /** Get all slots */
  const { ref: modalText } = useSlot<HTMLDivElement>('content', webcomponent);
  const { ref: modalIllustration } = useSlot<HTMLDivElement>('illustration', webcomponent);
  const { ref: modalPrimaryBtn } = useSlot<HTMLDivElement>('primaryButton', webcomponent);
  const { ref: modalSecondaryBtn } = useSlot<HTMLDivElement>('secondaryButton', webcomponent);

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
      webcomponent.triggerEvent('isShowingOnChange', false);
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
  useLockBodyScroll(hasLockBodyScroll && isShowing);

  /** When the modal is closed add focus back to the element that had focus when the modal was opened. */
  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;
    return () => {
      originalFocusedElement && originalFocusedElement.focus();
    };
  }, []);

  /** Trap focus inside modal */
  useEffect(() => {
    if (!isShowing) {
      return;
    }
    trapFocus(modalWrapperRef);

    return () => {
      releaseFocusTrap();
    };
  }, [isShowing]);

  return (
    <Modal
      aria-modal
      tabIndex={-1}
      role="dialog"
      aria-label={heading}
      isShowing={isShowing}
      disableBackdrop={disableBackdrop}
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
        {illustration && <ModalIllustration>{illustration}</ModalIllustration>}
        {!illustration && hasIllustration && <ModalIllustration ref={modalIllustration}></ModalIllustration>}
        {hasCloseButton && (
          <ModalCloseButton
            onClick={() => handleOnClose()}
            onMouseEnter={() => setIsHoveringCloseButton(true)}
            onMouseLeave={() => setIsHoveringCloseButton(false)}
            aria-label="Lukk modal"
            name="Lukk modal"
          >
            <IconWrapper
              icon={close}
              color={hasIllustration ? getThemeColor('static-white') : undefined}
              style={{ filter: isHoveringCloseButton && hasIllustration ? 'invert(1)' : undefined }}
            />
          </ModalCloseButton>
        )}

        <ModalContent hasIllustration={hasIllustration} hasPadding={hasPadding}>
          {heading && <ModalHeading hasIllustration={hasIllustration}>{heading}</ModalHeading>}
          <ModalText data-testid="modal-content" ref={modalText}>
            {content}
          </ModalText>
          {(hasPrimaryButton || hasSecondaryButton) && (
            <ModalActions>
              {secondaryButton && (
                <secondaryButton.type {...secondaryButton.props}>
                  {secondaryButton.props.children}
                </secondaryButton.type>
              )}
              {webcomponent && hasSecondaryButton && (
                <div className="webComponentBtn" ref={modalSecondaryBtn}></div>
              )}
              {primaryButton ? (
                <primaryButton.type {...primaryButton.props}>
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
