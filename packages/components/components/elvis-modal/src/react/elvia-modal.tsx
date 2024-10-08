import close from '@elvia/elvis-assets-icons/dist/icons/close';
import { IconButton, IconWrapper, Overlay, useFocusTrap, useLanguage, useSlot } from '@elvia/elvis-toolbox';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { ModalProps } from './elvia-modal.types';
import {
  CloseButtonContainer,
  ModalActions,
  ModalBackdrop,
  ModalContent,
  ModalHeading,
  ModalIllustration,
  ModalText,
  ModalWrapper,
  PrimaryButton,
  SecondaryButton,
} from './styledComponents';
import { useLockBodyScroll } from './useLockBodyScroll';

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

  const [isModalOpen, setIsModalOpen] = useState(isShowing);
  const [fadeOut, setFadeOut] = useState(false);

  const isModalOpenMemo = useMemo(() => [isModalOpen], [isModalOpen]);
  /** Get all slots */
  const { ref: modalHeading } = useSlot<HTMLHeadingElement>('heading', webcomponent, {
    useEffectDependencies: isModalOpenMemo,
  });
  const { ref: modalIllustration } = useSlot<HTMLDivElement>('illustration', webcomponent, {
    useEffectDependencies: isModalOpenMemo,
  });
  const { ref: modalPrimaryBtn } = useSlot<HTMLDivElement>('primaryButton', webcomponent, {
    useEffectDependencies: isModalOpenMemo,
  });
  const { ref: modalSecondaryBtn } = useSlot<HTMLDivElement>('secondaryButton', webcomponent, {
    useEffectDependencies: isModalOpenMemo,
  });
  const { ref: modalText } = useSlot<HTMLDivElement>('content', webcomponent, {
    useEffectDependencies: isModalOpenMemo,
  });

  const hasIllustration = !!illustration || !!webcomponent?.getSlot('illustration');
  const hasPrimaryButton = !!primaryButton || !!webcomponent?.getSlot('primaryButton');
  const hasSecondaryButton = !!secondaryButton || !!webcomponent?.getSlot('secondaryButton');
  const hasHeading = !!heading || !!webcomponent?.getSlot('heading');

  const lang = useLanguage();

  const getAriaLabel = (): string => {
    if (heading && typeof heading === 'string') {
      return heading;
    } else if (webcomponent?.getSlot('heading')) {
      return webcomponent.getSlot('heading').textContent ?? (lang === 'no' ? 'Forgrunnsvindu' : 'Modal');
    } else {
      return lang === 'no' ? 'Forgrunnsvindu' : 'Modal';
    }
  };

  const getCloseAriaLabel = () => {
    return lang === 'no' ? 'Lukk forgrunnsvindu' : 'Close modal';
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
      originalFocusedElement?.focus();

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
      <Overlay
        ref={overlayRef}
        onClose={dispatchOnClose}
        center
        disableClose={isShowing && disableClose} // Can still be closed programmatically, but not from backdrop click
        backdrop={!disableBackdrop ? <ModalBackdrop data-testid="modal-backdrop" /> : undefined}
        startFade={fadeOut}
      >
        <ModalWrapper
          hasIllustration={hasIllustration}
          className={className}
          style={inlineStyle}
          maxWidth={maxWidth}
          role="dialog"
          aria-label={getAriaLabel()}
          {...rest}
        >
          {hasIllustration && (
            <ModalIllustration className="e-theme-dark" role="presentation" ref={modalIllustration}>
              {illustration}
            </ModalIllustration>
          )}
          {hasCloseButton && (
            <CloseButtonContainer hasIllustration={hasIllustration}>
              <IconButton onClick={() => setFadeOut(true)} aria-label={getCloseAriaLabel()}>
                <IconWrapper icon={close} />
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
    )
  );
};

export default Modal;
