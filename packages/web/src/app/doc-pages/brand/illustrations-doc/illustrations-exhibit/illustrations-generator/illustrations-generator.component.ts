import { Component, ElementRef, effect, inject, input } from '@angular/core';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationName } from '../illustrations-exhibit-data';

@Component({
  selector: 'app-illustrations-generator',
  template: '',
})
export class IllustrationsGeneratorComponent {
  private elementRef = inject(ElementRef);

  illustrationName = input.required<IllustrationName | undefined | null>();
  color = input<IllustrationColor | null>();

  constructor() {
    effect(() => {
      this.updateIllustration();
    });
    effect(() => {
      this.updateColor();
    });
  }

  private updateIllustration = () => {
    if (!this.illustrationName()) {
      return;
    }
    const illustrationElement = document.createElement(`elvia-illustrations-${this.illustrationName()}`);
    this.elementRef.nativeElement.innerHTML = '';
    this.elementRef.nativeElement.appendChild(illustrationElement);
  };

  private updateColor = () => {
    const illustrationElement = this.elementRef.nativeElement.querySelector(
      `elvia-illustrations-${this.illustrationName()}`,
    );
    if (illustrationElement) {
      illustrationElement.setAttribute('color', this.color() ?? 'grey');
    }
  };
}
