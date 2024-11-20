import { Component, ElementRef, effect, input, inject } from '@angular/core';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationName } from '../illustrations-exhibit-data';

@Component({
  selector: 'app-illustrations-generator',
  standalone: true,
  template: '',
})
export class IllustrationsGeneratorComponent {
  private el = inject(ElementRef);

  protected illustrationName = input.required<IllustrationName | undefined | null>();
  protected color = input<IllustrationColor | null>();

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
