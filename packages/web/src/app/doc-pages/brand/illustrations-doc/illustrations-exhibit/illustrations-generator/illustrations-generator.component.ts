import { AfterViewInit, Component, ElementRef, OnChanges, input } from '@angular/core';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationName } from '../illustrations-exhibit-data';

@Component({
  selector: 'app-illustrations-generator',
  standalone: true,
  template: '',
})
export class IllustrationsGeneratorComponent implements AfterViewInit, OnChanges {
  private illustrationName = input.required<IllustrationName | undefined>();
  private color = input<IllustrationColor | null>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.updateIllustration();
  }

  ngOnChanges(): void {
    this.updateIllustration();
  }

  private updateIllustration = () => {
    if (!this.illustrationName()) {
      return;
    }
    const illustrationElement = document.createElement(`elvia-illustrations-${this.illustrationName()}`);
    if (this.color()) {
      illustrationElement.setAttribute('color', this.color() ?? 'grey');
    }
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(illustrationElement);
  };
}
