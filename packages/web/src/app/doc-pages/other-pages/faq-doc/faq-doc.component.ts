import { Component, ViewChild, ElementRef } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-faq-doc',
  templateUrl: './faq-doc.component.html',
  styleUrls: ['./faq-doc.component.scss'],
})
export class FaqDocComponent {
  @ViewChild('contribute') contribute: ElementRef;
  @ViewChild('bugs') bugs: ElementRef;
  @ViewChild('browsers') browsers: ElementRef;

  description = getDocPagesNotFromCMS('faq').description;

  toggleOpen(id: string): void {
    if (id === 'contribute') {
      if (this.contribute.nativeElement.classList.contains('e-accordion__item--open')) {
        this.contribute.nativeElement.classList.remove('e-accordion__item--open');
      } else {
        this.contribute.nativeElement.classList.add('e-accordion__item--open');
      }
    }
    if (id === 'bugs') {
      if (this.bugs.nativeElement.classList.contains('e-accordion__item--open')) {
        this.bugs.nativeElement.classList.remove('e-accordion__item--open');
      } else {
        this.bugs.nativeElement.classList.add('e-accordion__item--open');
      }
    }
    if (id === 'browsers') {
      if (this.browsers.nativeElement.classList.contains('e-accordion__item--open')) {
        this.browsers.nativeElement.classList.remove('e-accordion__item--open');
      } else {
        this.browsers.nativeElement.classList.add('e-accordion__item--open');
      }
    }
  }
}
