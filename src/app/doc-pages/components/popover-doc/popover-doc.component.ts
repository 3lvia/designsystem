import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  @ViewChild('popover1') popover1: ElementRef;
  @ViewChild('popover2') popover2: ElementRef;

  figmaUrl = getComponent('popover-doc').figmaUrl;
  // tslint:disable-next-line:max-line-length
  does = [
    'When you want to give the user more information about something, and are typically paired with an information or question icon.',
  ];
  donts = [
    'Should not be used if the information in popover is necessary for the user to complete their task.',
  ];

  example1 = `<div style="margin-top: 260px; text-align: center;">
  <span class="e-popover e-m-16">
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
      <div class="e-popover__title">Om innlogging</div>
      <div class="e-popover__text">
        Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
        BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
        Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
        Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
      </div>
    </div>
  </span>
</div>
`;

  example2 = `<div style="margin-top: 260px; text-align: center;">
  <span class="e-popover e-popover--top--left e-m-16">
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
      <div class="e-popover__title">Om innlogging</div>
      <div class="e-popover__text">
        Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
        BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
        Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
        Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
      </div>
    </div>
  </span>
</div>
`;

  example3 = `<div style="margin-bottom: 260px; text-align: center;">
  <span class="e-popover e-popover--bottom e-m-16">
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
      <div class="e-popover__title">Om innlogging</div>
      <div class="e-popover__text">
        Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
        BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
        Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
        Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
      </div>
    </div>
  </span>
</div>
`;
  example4 = `<div style="margin-bottom: 260px; text-align: center;">
  <span class="e-popover e-popover--bottom e-popover--bottom--right e-m-16">
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
      <div class="e-popover__title">Om innlogging</div>
      <div class="e-popover__text">
        Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
        BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
        Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
        Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
      </div>
    </div>
  </span>
</div>
`;

  popupLiveCode = ` // Js example implementation

// Get current window width
getWindowWidth(): number {
  const windowWidth = window.innerWidth;
  return windowWidth;
}

togglePopup(popOverId: string, contentId: string): void {
  // find popover wrapper element.
  const popOverElement = document.getElementById(popOverId);

  // find popover contentArea
  const popoverContentElement = document.getElementById(contentId);

  // toggle the e-none class on or off
  if (popoverContentElement.classList.contains('e-none')) {
    popoverContentElement.classList.remove('e-none');
  } else {
    popoverContentElement.classList.add('e-none');
    return;
  }

  // check for any alignment classes and remove them before calculating width
  if (popOverElement.classList.contains('e-popover--bottom--left')) {
    popOverElement.classList.remove('e-popover--bottom--left');
  } else if (popOverElement.classList.contains('e-popover--bottom--right')) {
    popOverElement.classList.remove('e-popover--bottom--left');
  } else if (popOverElement.classList.contains('e-popover--top--right')) {
    popOverElement.classList.remove('e-popover--bottom--left');
  } else if (popOverElement.classList.contains('e-popover--top--left')) {
    popOverElement.classList.remove('e-popover--bottom--left');
  }

  // get current window width
  const currentWindowWidht = this.getWindowWidth();
  // store initial classes
  const currentClasses = popOverElement.className;
  // find the child element containting the content element of the popOver
  let popOverContent = null;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < popOverElement.children.length; i++) {
    if (popOverElement.children[i].className === 'e-popover__content') {
      popOverContent = popOverElement.children[i];
    }
  }
  // get content element coordinates in window.
  const ContentPosition = popOverContent.getBoundingClientRect();
  // add alignment classes left or right if content extends window width
  if (currentClasses.includes('bottom')) {
    if (currentWindowWidht < ContentPosition.right) {
      popOverElement.classList.add('e-popover--bottom--left');
    } else if (0 > ContentPosition.left) {
      popOverElement.classList.add('e-popover--bottom--right');
    }
  }
  if (currentClasses.includes('bottom') === false) {
    if (currentWindowWidht < ContentPosition.right) {
      popOverElement.classList.add('e-popover--top--left');
    } else if (0 > ContentPosition.left) {
      popOverElement.classList.add('e-popover--top--right');
    }
  }
}

closePopover(popUpContent: string): void {
  const popupContentElement: HTMLElement = document.getElementById(popUpContent);
  popupContentElement.classList.add('e-none');
}`;


  // Js example implementation

  // Get current window width
  getWindowWidth(): number {
    const windowWidth = window.innerWidth;
    return windowWidth;
  }

  togglePopup(popOverId: string, contentId: string): void {
    // find popover wrapper element.
    const popOverElement = document.getElementById(popOverId);

    // find popover contentArea
    const popoverContentElement = document.getElementById(contentId);

    // toggle the e-none class on or off
    if (popoverContentElement.classList.contains('e-none')) {
      popoverContentElement.classList.remove('e-none');
    } else {
      popoverContentElement.classList.add('e-none');
      return;
    }

    // check for any alignment classes and remove them before calculating width
    if (popOverElement.classList.contains('e-popover--bottom--left')) {
      popOverElement.classList.remove('e-popover--bottom--left');
    } else if (popOverElement.classList.contains('e-popover--bottom--right')) {
      popOverElement.classList.remove('e-popover--bottom--left');
    } else if (popOverElement.classList.contains('e-popover--top--right')) {
      popOverElement.classList.remove('e-popover--bottom--left');
    } else if (popOverElement.classList.contains('e-popover--top--left')) {
      popOverElement.classList.remove('e-popover--bottom--left');
    }


    // get current window width
    const currentWindowWidht = this.getWindowWidth();
    // store initial classes
    const currentClasses = popOverElement.className;
    // find the child element containting the content element of the popOver
    let popOverContent = null;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < popOverElement.children.length; i++) {
      if (popOverElement.children[i].className === 'e-popover__content') {
        popOverContent = popOverElement.children[i];
      }
    }
    // get content element coordinates in window.
    const ContentPosition = popOverContent.getBoundingClientRect();
    // add alignment classes left or right if content extends window width
    if (currentClasses.includes('bottom')) {
      if (currentWindowWidht < ContentPosition.right) {
        popOverElement.classList.add('e-popover--bottom--left');
      } else if (0 > ContentPosition.left) {
        popOverElement.classList.add('e-popover--bottom--right');
      }
    }
    if (currentClasses.includes('bottom') === false) {
      if (currentWindowWidht < ContentPosition.right) {
        popOverElement.classList.add('e-popover--top--left');
      } else if (0 > ContentPosition.left) {
        popOverElement.classList.add('e-popover--top--right');
      }
    }
  }

  closePopover(popUpContent: string): void {
    const popupContentElement: HTMLElement = document.getElementById(popUpContent);
    popupContentElement.classList.add('e-none');
  }
}


