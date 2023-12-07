import React, { FC, useRef, useEffect, useState, useMemo } from 'react';
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

  const hasHeading = useMemo(() => !!heading || !!webcomponent?.getSlot('heading'), [heading, webcomponent]);

  /** Get all slots */
  const { ref: modalHeading } = useSlot<HTMLHeadingElement>('heading', webcomponent, {
    useEffectDependencies: hasHeading,
  });
  const { ref: modalIllustration } = useSlot<HTMLDivElement>('illustration', webcomponent, {
    useEffectDependencies: isShowing,
  });
  const { ref: modalPrimaryBtn } = useSlot<HTMLDivElement>('primaryButton', webcomponent, {
    useEffectDependencies: isShowing,
  });
  const { ref: modalSecondaryBtn } = useSlot<HTMLDivElement>('secondaryButton', webcomponent, {
    useEffectDependencies: isShowing,
  });
  const { ref: modalText } = useSlot<HTMLDivElement>('content', webcomponent, {
    useEffectDependencies: isShowing,
  });

  usePositioning({ overlayRef, isShowing });

  const hasIllustration = !!illustration || !!webcomponent?.getSlot('illustration');
  const hasPrimaryButton = !!primaryButton || !!webcomponent?.getSlot('primaryButton');
  const hasSecondaryButton = !!secondaryButton || !!webcomponent?.getSlot('secondaryButton');

  const getAriaLabel = (): string => {
    if (heading && typeof heading === 'string') {
      return heading;
    } else if (webcomponent?.getSlot('heading')) {
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

  useEffect(() => {
    if (!isShowing) {
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
  }, [isShowing]);

  return (
    isShowing && (
      <>
        {!disableBackdrop && <ModalBackdrop />}
        <Overlay ref={overlayRef} onClose={handleOnClose} hasBackdrop={!disableClose}>
          <ModalWrapper
            hasIllustration={hasIllustration}
            className={className}
            style={inlineStyle}
            maxWidth={maxWidth}
            role="dialog"
            aria-label={getAriaLabel()}
            data-testid="modal-wrapper"
            {...rest}
          >
            {illustration && <ModalIllustration>{illustration}</ModalIllustration>}
            {!illustration && hasIllustration && (
              <ModalIllustration ref={modalIllustration}></ModalIllustration>
            )}
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

            <ModalContent hasIllustration={hasIllustration} hasPadding={!noPadding}>
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
                  <SecondaryButton>
                    {secondaryButton ?? null}
                    {webcomponent && hasSecondaryButton && <div ref={modalSecondaryBtn}></div>}
                  </SecondaryButton>
                  <PrimaryButton>
                    {primaryButton ?? (!webcomponent && <div style={{ width: '50%' }}></div>)}
                    {webcomponent && <div ref={modalPrimaryBtn}></div>}
                  </PrimaryButton>
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
