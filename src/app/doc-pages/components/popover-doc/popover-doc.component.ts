import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss'],
})
export class PopoverDocComponent {
  @ViewChild('popover1') popover1: ElementRef;

  figmaUrl = getComponent('popover-doc').figmaUrl;
  description = getComponent('popover-doc').description;
  // tslint:disable-next-line:max-line-length
  does = [
    'When you want to give the user more information about something, and are typically paired with an information or question icon.',
  ];
  donts = [
    'Should not be used if the information in popover is necessary for the user to complete their task.',
  ];

  exampleOverview = `<span class="e-popover">
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
`;

  example1 = `<div style="margin-top: 320px; text-align: center;">
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

  example2 = `<div style="margin-top: 320px; margin-left:16px">
  <span class="e-popover e-popover--right e-m-16">
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

  example3 = `<div style="margin-bottom: 320px; text-align: center;">
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
  example4 = `<div style="margin-bottom: 320px; margin-left:16px;">
  <span class="e-popover e-popover--bottom e-popover--right e-m-16">
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

  popupLiveCode = ` /*
Note that this is only a mockup example. Adjustments and other implementations are most
likely necessary for implementing a functioning popover in your project.
*/
// for closing dropdown content on click outside of the content area
  showPopover = false;
  @HostListener('click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(event: any): void {
    if (event.target.id === 'popoverIcon') {
      return;
    }
    if (this.showPopover === true) {
      this.closePopover('popover1Content');
    }
  }

  // main function to toggle and adjust position of popove
  togglePopup(popOverId: string, contentId: string): void {
    // find popover wrapper element.
    const popOverElement = document.getElementById(popOverId);
    // find popover contentArea
    const popoverContentElement = document.getElementById(contentId);
    // toggle the e-none class on or off
    if (popoverContentElement.classList.contains('e-none')) {
      popoverContentElement.classList.remove('e-none');
      this.showPopover = true;
    } else {
      popoverContentElement.classList.add('e-none');
      this.showPopover = false;
      return;
    }
    // store inital classes of popover
    const initialClasses = popOverElement.classList;
    const initialClassesArray = [];
    initialClasses.forEach(element => {
      initialClassesArray.push(element.toString());
    });

    // remove any inital alignment classes
    this.removeAlignClasses(popOverElement);
    // find contentposition and add alignment if neccesary
    this.getElementPosition(popoverContentElement);
    this.addAlignment(popoverContentElement, popOverElement, initialClassesArray);
    // check if new alignements make the popover exceed window and remove if so to center popover
    this.removeAlignment(popoverContentElement, popOverElement);

  }
  // check to see if any current alignment classes make popover exceed the window
  removeAlignClasses(element: HTMLElement): void {
    const alignClasses = ['e-popover--left', 'e-popover--left-50', 'e-popover--right', 'e-popover--right-50'];
    alignClasses.forEach(cssClass => {
      if (element.classList.contains(cssClass)) {
        element.classList.remove(cssClass);
      }
    });
  }
  // add suitable alignment class if inital classes make the popover exceed the window
  addAlignment(contentElement: HTMLElement, element: HTMLElement, initialClasses: any[]): void {
    const currentWindowWidht = this.getWindowWidth();
    const contentPosition = this.getElementPosition(contentElement);
    let changes = false;

    if (contentPosition.right > currentWindowWidht) {
      element.classList.add('e-popover--left');
      changes = true;
    }
    if (contentPosition.left < 0) {
      element.classList.add('e-popover--right');
      changes = true;
    }
    if (!changes) {
      element.classList.remove('e-popover');
      initialClasses.forEach(initalClass => {
        element.classList.add(initalClass);
      });
    }
  }
  // remove any alignment class if they make the popover content exceed the window
  removeAlignment(contentElement: HTMLElement, element: HTMLElement): void {
    const currentWindowWidht = this.getWindowWidth();
    const contentPosition = this.getElementPosition(contentElement);
    if (contentPosition.left < 0 || contentPosition.right > currentWindowWidht) {
      this.removeAlignClasses(element);
    }
  }
  // Get current window width
  getWindowWidth(): number {
    const windowWidth = window.innerWidth;
    return windowWidth;
  }
  // Get DOM position of content area of popover
  getElementPosition(element: HTMLElement) {
    return element.getBoundingClientRect();
  }
  // closes the popover class
  closePopover(popUpContent: string): void {
    const popupContentElement: HTMLElement = document.getElementById(popUpContent);
    popupContentElement.classList.add('e-none');
  }`;


  // Js example implementation

  showPopover = false;
  // for closing dropdown content on click outside of the content area
  @HostListener('click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(event: any): void {
    if (event.target.id === 'popoverIcon') {
      return;
    }
    if (this.showPopover === true) {
      this.closePopover('popover1Content');
    }
  }
  // main function to toggle and adjust position of popover
  togglePopup(popOverId: string, contentId: string): void {
    // find popover wrapper element.
    const popOverElement = document.getElementById(popOverId);
    // find popover contentArea
    const popoverContentElement = document.getElementById(contentId);
    // toggle the e-none class on or off
    if (popoverContentElement.classList.contains('e-none')) {
      popoverContentElement.classList.remove('e-none');
      this.showPopover = true;
    } else {
      popoverContentElement.classList.add('e-none');
      this.showPopover = false;
      return;
    }
    // store inital classes of popover
    const initialClasses = popOverElement.classList;
    const initialClassesArray = [];
    initialClasses.forEach(element => {
      initialClassesArray.push(element.toString());
    });

    // remove any inital alignment classes
    this.removeAlignClasses(popOverElement);
    // find contentposition and add alignment if neccesary
    this.getElementPosition(popoverContentElement);
    this.addAlignment(popoverContentElement, popOverElement, initialClassesArray);
    // check if new alignements make the popover exceed window and remove if so to center popover
    this.removeAlignment(popoverContentElement, popOverElement);

  }
  // check to see if any current alignment classes make popover exceed the window
  removeAlignClasses(element: HTMLElement): void {
    const alignClasses = ['e-popover--left', 'e-popover--left-50', 'e-popover--right', 'e-popover--right-50'];
    alignClasses.forEach(cssClass => {
      if (element.classList.contains(cssClass)) {
        element.classList.remove(cssClass);
      }
    });
  }
  // add suitable alignment class if inital classes make the popover exceed the window
  addAlignment(contentElement: HTMLElement, element: HTMLElement, initialClasses: any[]): void {
    const currentWindowWidht = this.getWindowWidth();
    const contentPosition = this.getElementPosition(contentElement);
    let changes = false;

    if (contentPosition.right > currentWindowWidht) {
      element.classList.add('e-popover--left');
      changes = true;
    }
    if (contentPosition.left < 0) {
      element.classList.add('e-popover--right');
      changes = true;
    }
    if (!changes) {
      element.classList.remove('e-popover');
      initialClasses.forEach(initalClass => {
        element.classList.add(initalClass);
      });
    }
  }
  // remove any alignment class if they make the popover content exceed the window
  removeAlignment(contentElement: HTMLElement, element: HTMLElement): void {
    const currentWindowWidht = this.getWindowWidth();
    const contentPosition = this.getElementPosition(contentElement);
    if (contentPosition.left < 0 || contentPosition.right > currentWindowWidht) {
      this.removeAlignClasses(element);
    }
  }
  // Get current window width
  getWindowWidth(): number {
    const windowWidth = window.innerWidth;
    return windowWidth;
  }
  // Get DOM position of content area of popover
  getElementPosition(element: HTMLElement) {
    return element.getBoundingClientRect();
  }
  // closes the popover class
  closePopover(popUpContent: string): void {
    const popupContentElement: HTMLElement = document.getElementById(popUpContent);
    popupContentElement.classList.add('e-none');
  }
}


