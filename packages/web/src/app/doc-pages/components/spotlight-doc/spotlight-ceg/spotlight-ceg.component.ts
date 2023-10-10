import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseSpotlightProps } from '@elvia/elvis-spotlight/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

@Component({
  selector: 'app-spotlight-ceg',
  templateUrl: './spotlight-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: SpotlightCegComponent }],
})
export class SpotlightCegComponent implements ComponentExample, AfterViewInit {
  @ViewChild('spotlight') spotlight: ElementRef<ElvisComponentWrapper>;
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

  ngAfterViewInit() {
    this.toggleSpotlight();
    this.updateSpotlightPosition();
  }

  toggleSpotlight() {
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
