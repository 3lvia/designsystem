import { Component, ElementRef, effect, input } from '@angular/core';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationName } from '../illustrations-exhibit-data';

@Component({
  selector: 'app-illustrations-generator',
  template: '',
})
export class IllustrationsGeneratorComponent {
  illustrationName = input.required<IllustrationName | undefined | null>();
  color = input<IllustrationColor | null>();

  constructor(private el: ElementRef) {
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
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(illustrationElement);
  };

  private updateColor = () => {
    const illustrationElement = this.el.nativeElement.querySelector(
      `elvia-illustrations-${this.illustrationName()}`,
    );
    if (illustrationElement) {
      illustrationElement.setAttribute('color', this.color() ?? 'grey');
    }
  };
}
