import React, { FC, useRef, useEffect, useState } from 'react';
import {
  CloseButtonContainer,
  ModalContent,
  ModalIllustration,
  ModalBackdrop,
  ModalHeading,
  ModalWrapper,
  ModalText,
  ModalActions,
  SecondaryButton,
  PrimaryButton,
} from './styledComponents';
import { getThemeColor } from '@elvia/elvis-colors';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useFocusTrap, useSlot, IconWrapper, IconButton, Overlay } from '@elvia/elvis-toolbox';
import close from '@elvia/elvis-assets-icons/dist/icons/close';
import { ModalProps } from './elvia-modal.types';
import { usePositioning } from './usePositioning';

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
  noPadding = false,
  disableClose = false,
  disableBackdrop = false,
  maxWidth,
  onClose,
  webcomponent,
  ...rest
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const { lockBodyScroll, releaseBodyScroll } = useLockBodyScroll();

  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(isShowing);
  const [fadeOut, setFadeOut] = useState(false);

  /** Get all slots */
  const { ref: modalHeading } = useSlot<HTMLHeadingElement>('heading', webcomponent, {
    useEffectDependencies: isModalOpen,
  });
  const { ref: modalIllustration } = useSlot<HTMLDivElement>('illustration', webcomponent, {
    useEffectDependencies: isModalOpen,
  });
  const { ref: modalPrimaryBtn } = useSlot<HTMLDivElement>('primaryButton', webcomponent, {
    useEffectDependencies: isModalOpen,
  });
  const { ref: modalSecondaryBtn } = useSlot<HTMLDivElement>('secondaryButton', webcomponent, {
    useEffectDependencies: isModalOpen,
  });
  const { ref: modalText } = useSlot<HTMLDivElement>('content', webcomponent, {
    useEffectDependencies: isModalOpen,
  });

  usePositioning({ overlayRef, isModalOpen });

  const hasIllustration = !!illustration || !!webcomponent?.getSlot('illustration');
  const hasPrimaryButton = !!primaryButton || !!webcomponent?.getSlot('primaryButton');
  const hasSecondaryButton = !!secondaryButton || !!webcomponent?.getSlot('secondaryButton');
  const hasHeading = !!heading || !!webcomponent?.getSlot('heading');

  const getAriaLabel = (): string => {
    if (heading && typeof heading === 'string') {
      return heading;
    } else if (webcomponent?.getSlot('heading')) {
      return webcomponent.getSlot('heading').textContent ?? 'Forgrunnsvindu';
    } else {
      return 'Forgrunnsvindu';
    }
  };

  const dispatchOnClose = (): void => {
    setIsModalOpen(false);
    if (!isShowing) {
      return;
    }
    onClose?.();
    webcomponent?.setProps({ isShowing: false }, true);
    webcomponent?.triggerEvent('isShowingOnChange', false);
    webcomponent?.triggerEvent('onClose');
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    const originalFocusedElement = document.activeElement as HTMLElement;
    trapFocus(overlayRef);

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
  }, [isModalOpen]);

  useEffect(() => {
    if (isShowing) {
      setIsModalOpen(isShowing);
      setFadeOut(false);
    } else {
      setFadeOut(true);
    }
  }, [isShowing]);

  return (
    isModalOpen && (
      <>
        {!disableBackdrop && <ModalBackdrop />}
        <Overlay ref={overlayRef} onClose={dispatchOnClose} hasBackdrop={!disableClose} startFade={fadeOut}>
          <ModalWrapper
            hasIllustration={hasIllustration}
            className={className}
            style={inlineStyle}
            maxWidth={maxWidth}
            role="dialog"
            aria-label={getAriaLabel()}
            {...rest}
          >
            {illustration && <ModalIllustration>{illustration}</ModalIllustration>}
            {!illustration && hasIllustration && (
              <ModalIllustration ref={modalIllustration}></ModalIllustration>
            )}
            {hasCloseButton && (
              <CloseButtonContainer>
                <IconButton
                  onClick={() => setFadeOut(true)}
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

            <ModalContent hasIllustration={hasIllustration} hasPadding={!noPadding}>
              {hasHeading && (
                <ModalHeading ref={modalHeading} hasIllustration={hasIllustration}>
                  {heading}
                </ModalHeading>
              )}
              <ModalText ref={modalText}>{content}</ModalText>
              {(hasPrimaryButton || hasSecondaryButton) && (
                <ModalActions>
                  <SecondaryButton ref={modalSecondaryBtn}>{secondaryButton}</SecondaryButton>
                  <PrimaryButton ref={modalPrimaryBtn}>{primaryButton}</PrimaryButton>
                </ModalActions>
              )}
            </ModalContent>
          </ModalWrapper>
        </Overlay>
      </>
    )
  );
};

export default Modal;
