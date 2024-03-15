import { AfterViewInit, Component, ElementRef, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IllustrationColor } from '../../illustrations-data';
import { IllustrationName } from '../illustrations-exhibit-data';
import { IllustrationsExhibitService } from '../illustrations-exhibit.service';

@Component({
  selector: 'app-illustrations-generator',
  standalone: true,
  template: '',
})
export class IllustrationsGeneratorComponent implements AfterViewInit {
  private illustrationName = input.required<IllustrationName>();

  constructor(
    private el: ElementRef,
    illustrationExhibitService: IllustrationsExhibitService,
  ) {
    illustrationExhibitService.colorValue.pipe(takeUntilDestroyed()).subscribe((color) => {
      this.el.nativeElement.firstChild?.setAttribute('color', color);
    });
  }

  ngAfterViewInit(): void {
    const illustrationElement = document.createElement(`elvia-illustrations-${this.illustrationName()}`);
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(illustrationElement);
  }
}
