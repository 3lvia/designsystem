import React, { FC, useRef, useEffect } from 'react';
import * as StyledModal from './styledComponents';
import { useClickOutside } from './useClickOutside';
import { useKeyPress } from './useKeyPress';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useFocusTrap } from './useFocusTrap';

export interface ModalProps {
  content: HTMLElement;
  onHide: () => void;
  isShowing: boolean;
  primaryButton?: HTMLElement;
  secondaryButton?: HTMLElement;
  title?: string;
  darkMode?: boolean;
  noPadding?: boolean;
  className?: string;
  hasCloseBtn?: boolean;
  webcomponent?: any;
  illustration?: HTMLElement;
}

export const ModalComponent: FC<ModalProps> = ({
  primaryButton,
  secondaryButton,
  content,
  onHide,
  isShowing,
  title,
  noPadding = false,
  hasCloseBtn = false,
  webcomponent,
  illustration,
}) => {
  console.log('content', content);
  const ref = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalText = useRef<HTMLDivElement>(null);
  const modalIllustration = useRef<HTMLDivElement>(null);
  const modalPrimaryBtn = useRef<HTMLDivElement>(null);
  const modalSecondaryBtn = useRef<HTMLDivElement>(null);

  const handleOnHide = () => {
    if (!webcomponent) {
      onHide();
    } else if (webcomponent) {
      webcomponent.setProps({ isShowing: false }, true);
    }
  };

  useClickOutside(ref, () => isShowing && handleOnHide());
  useKeyPress('Escape', handleOnHide);
  useLockBodyScroll();
  useFocusTrap(ref); // funker ikke

  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;

    return () => {
      originalFocusedElement && originalFocusedElement.focus();
    };
  }, []);

  useEffect(() => {
    if (isShowing) {
      return; 
    } 
    
    // Get slotted items from web component
    if(modalText.current && webcomponent.getSlot('content')){
      modalText.current.innerHTML = '';
      modalText.current.appendChild(webcomponent.getSlot('content'));
    }

    if(modalIllustration.current && webcomponent.getSlot('illustration')) {
      modalIllustration.current.innerHTML = '';
      modalIllustration.current.appendChild(webcomponent.getSlot('illustration'));
    }
    
  }, [isShowing]);

  return (
    <StyledModal.Modal
      aria-modal
      tabIndex={-1}
      role="dialog"
      aria-label={title}
      ref={modalRef}
      isShowing={isShowing}
    >
      <StyledModal.Wrapper ref={ref} hasIllustration={!!illustration}>
        {illustration && <StyledModal.Illustration>{illustration}</StyledModal.Illustration>}
        {!illustration && <StyledModal.Illustration ref={modalIllustration}></StyledModal.Illustration>}

        {hasCloseBtn && (
          <StyledModal.CloseButton
            onClick={() => handleOnHide()}
            className="e-btn e-btn--icon e-btn--inverted"
          >
            <span className="e-btn__icon">
              <i
                className="e-icon e-icon--close-bold e-icon--inverted"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath d='M14.3 12.179a.25.25 0 010-.354l9.263-9.262A1.5 1.5 0 1021.439.442L12.177 9.7a.25.25 0 01-.354 0L2.561.442A1.5 1.5 0 00.439 2.563L9.7 11.825a.25.25 0 010 .354L.439 21.442a1.5 1.5 0 102.122 2.121l9.262-9.263a.25.25 0 01.354 0l9.262 9.263a1.5 1.5 0 002.122-2.121L14.3 12.179z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
                }}
                e-id="e-icon--close-bold"
              ></i>
            </span>
          </StyledModal.CloseButton>
        )}

        <StyledModal.Content hasIllustration={!!illustration}>
          {title && <StyledModal.Title>{title}</StyledModal.Title>}

          {content && <StyledModal.Text noPadding={noPadding}>{content}</StyledModal.Text>}
          {!content && <StyledModal.Text noPadding={noPadding} ref={modalText}></StyledModal.Text>}

          {(primaryButton || secondaryButton) && (
            <StyledModal.Actions>
              <>{secondaryButton}</>
              <>{primaryButton}</>
            </StyledModal.Actions>
          )}
        </StyledModal.Content>
      </StyledModal.Wrapper>
    </StyledModal.Modal>
  );
};

export default ModalComponent;
