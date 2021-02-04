import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-component-example-accordion',
  templateUrl: './component-example-accordion.component.html',
  styleUrls: ['./component-example-accordion.component.scss'],
})
export class ComponentExampleAccordionComponent {
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
