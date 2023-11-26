import React, { FC, useRef, useEffect, useState } from 'react';
import {
  CloseButtonContainer,
  ModalContent,
  ModalIllustration,
  Modal as StyledModal,
  ModalHeading,
  ModalWrapper,
  ModalText,
  ModalActions,
} from './styledComponents';
import { getThemeColor } from '@elvia/elvis-colors';
import { useClickOutside } from './useClickOutside';
import { useKeyPress } from './useKeyPress';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useFocusTrap, useSlot, IconWrapper, IconButton } from '@elvia/elvis-toolbox';
import close from '@elvia/elvis-assets-icons/dist/icons/close';
import { ModalProps } from './elvia-modal.types';

export const Modal: FC<ModalProps> = function ({
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
  hasPadding = true, // TODO: Change to `noPadding`. MAJOR!
  disableClose = false,
  disableBackdrop = false,
  maxWidth,
  onClose,
  webcomponent,
  ...rest
}) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const { lockBodyScroll, releaseBodyScroll } = useLockBodyScroll();

  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);

  /** Get all slots */
  const { ref: modalHeading } = useSlot<HTMLHeadingElement>('heading', webcomponent);
  const { ref: modalIllustration } = useSlot<HTMLDivElement>('illustration', webcomponent);
  const { ref: modalPrimaryBtn } = useSlot<HTMLDivElement>('primaryButton', webcomponent);
  const { ref: modalSecondaryBtn } = useSlot<HTMLDivElement>('secondaryButton', webcomponent);
  const { ref: modalText } = useSlot<HTMLDivElement>('content', webcomponent);

  const hasHeading = !!heading || !!(webcomponent && !!webcomponent.getSlot('heading'));
  const hasIllustration = !!illustration || !!(webcomponent && !!webcomponent.getSlot('illustration'));
  const hasPrimaryButton = !!primaryButton || !!(webcomponent && !!webcomponent.getSlot('primaryButton'));
  const hasSecondaryButton =
    !!secondaryButton || !!(webcomponent && !!webcomponent.getSlot('secondaryButton'));

  const getAriaLabel = (): string => {
    if (heading && typeof heading === 'string') {
      return heading;
    } else if (webcomponent && !!webcomponent.getSlot('heading')) {
      return webcomponent.getSlot('heading').textContent ?? 'Forgrunnsvindu';
    } else {
      return 'Forgrunnsvindu';
    }
  };

  /** Dispatch onClose events */
  const handleOnClose = (): void => {
    if (!isShowing) {
      return;
    }
    onClose?.();
    webcomponent?.setProps({ isShowing: false }, true);
    webcomponent?.triggerEvent('isShowingOnChange', false);
    webcomponent?.triggerEvent('onClose');
  };

  /**
   * Starts listener for click outside modal, closes modal when clicked
   * Starts listener for escape click, closes modal when clicked
   */
  !disableClose && useClickOutside(modalWrapperRef, () => isShowing && handleOnClose());
  useKeyPress('Escape', handleOnClose);

  useEffect(() => {
    if (!isShowing) {
      return;
    }
    const originalFocusedElement = document.activeElement as HTMLElement;
    trapFocus(modalWrapperRef);

    if (hasLockBodyScroll) {
      lockBodyScroll();
    }

    return () => {
      releaseFocusTrap();
      originalFocusedElement && originalFocusedElement.focus();

      if (hasLockBodyScroll) {
        releaseBodyScroll();
      }
    };
  }, [isShowing]);

  return (
    <StyledModal
      aria-modal
      tabIndex={-1}
      role="dialog"
      aria-label={getAriaLabel()}
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
          <CloseButtonContainer>
            <IconButton
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
            </IconButton>
          </CloseButtonContainer>
        )}

        <ModalContent hasIllustration={hasIllustration} hasPadding={hasPadding}>
          {hasHeading && (
            <ModalHeading ref={modalHeading} hasIllustration={hasIllustration}>
              {heading}
            </ModalHeading>
          )}
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
    </StyledModal>
  );
};

export default Modal;
