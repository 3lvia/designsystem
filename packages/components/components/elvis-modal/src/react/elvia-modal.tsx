import React, { FC, useRef, useEffect } from 'react';
import * as StyledModal from './styledComponents';
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
  hasCloseBtn?: boolean;
  hasLockBodyScroll?: boolean;
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
  hasCloseBtn = false,
  hasLockBodyScroll = true,
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
    if (!webcomponent) {
      onHide();
    } else if (webcomponent) {
      webcomponent.setProps({ isShowing: false }, true);
      webcomponent.triggerEvent('onHide');
    }
  };

  useClickOutside(modalWrapperRef, () => isShowing && handleOnHide());
  useKeyPress('Escape', handleOnHide);
  hasLockBodyScroll && useLockBodyScroll(isShowing);
  useFocusTrap(modalWrapperRef);

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
  }, [isShowing]);

  return (
    <StyledModal.Modal aria-modal tabIndex={-1} role="dialog" aria-label={title} isShowing={isShowing}>
      <StyledModal.Wrapper ref={modalWrapperRef} hasIllustration={hasIllustration} className={className}>
        {illustration && <StyledModal.Illustration>{illustration}</StyledModal.Illustration>}
        {!illustration && hasIllustration && (
          <StyledModal.Illustration ref={modalIllustration}></StyledModal.Illustration>
        )}
        {hasCloseBtn && (
          <StyledModal.CloseButton
            hasIllustration={hasIllustration}
            onClick={() => handleOnHide()}
            aria-label="Lukk modal"
          >
            <i className="ewc-icon"></i>
          </StyledModal.CloseButton>
        )}

        <StyledModal.Content hasIllustration={hasIllustration}>
          {title && <StyledModal.Title hasIllustration={hasIllustration}>{title}</StyledModal.Title>}

          {content && <StyledModal.Text>{content}</StyledModal.Text>}
          {!content && <StyledModal.Text ref={modalText}></StyledModal.Text>}

          {(hasPrimaryButton || hasSecondaryButton) && (
            <StyledModal.Actions>
              {secondaryButton ? (
                <>{secondaryButton}</>
              ) : (
                <div tabIndex={0} className="webComponentBtn" ref={modalSecondaryBtn}></div>
              )}
              {primaryButton ? (
                <>{primaryButton}</>
              ) : (
                <div tabIndex={0} className="webComponentBtn" ref={modalPrimaryBtn}></div>
              )}
            </StyledModal.Actions>
          )}
        </StyledModal.Content>
      </StyledModal.Wrapper>
    </StyledModal.Modal>
  );
};

export default ModalComponent;
