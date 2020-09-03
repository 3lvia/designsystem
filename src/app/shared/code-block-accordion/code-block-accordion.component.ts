import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-code-block-accordion',
  templateUrl: './code-block-accordion.component.html',
  styleUrls: ['./code-block-accordion.component.scss'],
})
export class CodeBlockAccordionComponent {

  @ViewChild('accordionItem') accordionItem: ElementRef;

  showCode = false;

  toggleOpen(): void {
    if (this.accordionItem.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionItem.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionItem.nativeElement.classList.add('e-accordion__item--open');
    }
  }

}
