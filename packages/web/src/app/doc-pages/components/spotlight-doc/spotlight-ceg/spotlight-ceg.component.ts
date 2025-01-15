import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { BaseSpotlightProps } from '@elvia/elvis-spotlight/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-spotlight-ceg',
  templateUrl: './spotlight-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: SpotlightCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpotlightCegComponent implements ComponentExample, AfterViewInit {
  // @ts-expect-error TS2564 (LEGO-3683)
  @ViewChild('spotlight') spotlight: ElementRef<ElvisComponentWrapper>;
  // @ts-expect-error TS2564 (LEGO-3683)
  @ViewChild('trigger') trigger: ElementRef<HTMLButtonElement>;

  elementName = 'spotlight';
  cegContent = new CegControlManager<BaseSpotlightProps>([
    {
      controls: {
        shape: {
          type: 'radioGroup',
          group: 'Shape',
          value: 'circle',
          radios: [
            { label: 'Circle', value: 'circle' },
            { label: 'Rectangle', value: 'rectangle' },
          ],
        },
      },
      groupOrder: ['Shape'],
      staticProps: {
        position: { horizontal: 300, vertical: 300 },
        radius: 100,
      },
    },
  ]);
  isSpotlight = false;

  ngAfterViewInit() {
    this.toggleSpotlight(true);
    this.updateSpotlightPosition();
  }

  toggleSpotlight(isInitial?: boolean) {
    if (!isInitial) {
      this.isSpotlight = !this.isSpotlight;
    }

    const isHidden = this.spotlight.nativeElement.classList.toggle('e-none');
    this.spotlight.nativeElement.setProps({ hasLockBodyScroll: !isHidden });
    this.updateSpotlightPosition();
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  private updateSpotlightPosition() {
    const { left, top, width, height } = this.trigger.nativeElement.getBoundingClientRect();
    this.spotlight.nativeElement.setProps({
      position: { horizontal: left + width / 2, vertical: top + height / 2 },
    });
  }
}
