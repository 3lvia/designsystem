import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentExample } from './componentExample';
import { CegControl, ControlConfiguration, ControlValue } from './controlType';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { clone } from './utils';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements OnInit {
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) cegContent: ComponentExample;
  selectedConfiguration = new BehaviorSubject<ControlConfiguration>({
    controls: {},
    name: '',
    groupOrder: [],
    customText: {},
  });

  get hasMultipleConfigurations() {
    return this.cegContent.controls.pipe(map((configurations) => configurations.length > 1));
  }

  get hasCustomText() {
    return this.selectedConfiguration.pipe(
      map((configuration) => configuration.customText && Object.keys(configuration.customText).length > 0),
    );
  }

  ngOnInit(): void {
    const firstControls = this.cegContent.controls.value[0];

    /**
     * We clone the control objects to prevent mutating the original configuration.
     * This allows us to reset the controls to the original state when the CEG
     * type is changed.
     */
    this.selectedConfiguration.next(clone(firstControls));
  }

  setPropValue(event: { key: string; value: ControlValue }, customText = false): void {
    if (customText && typeof event.value === 'string') {
      const existingText = this.selectedConfiguration.value.customText[event.key];
      existingText.value = event.value;
    } else {
      const existingControl = this.getControl(event.key);

      if (existingControl) {
        existingControl.value = event.value;
      }
    }
    this.selectedConfiguration.next({ ...this.selectedConfiguration.value });

    this.setPropOnWebComponent(event.key, event.value);
  }

  setControls(configuration: ControlConfiguration): void {
    this.selectedConfiguration.next(clone(configuration));
    this.cegContent.currentControl?.next(configuration.name);
  }

  private getControl(name: string): CegControl | undefined {
    const topLevelControl = this.selectedConfiguration.value.controls[name];
    if (topLevelControl) {
      return topLevelControl;
    }

    for (let control of Object.values(this.selectedConfiguration.value.controls)) {
      if (control.type === 'checkbox') {
        const child = Object.entries(control.children).find(([key]) => key === name);
        if (child) {
          return child[1];
        }
      }
    }
  }

  private setPropOnWebComponent(key: string, value: ControlValue): void {
    const component = this.componentContainer.nativeElement.querySelector(
      `elvia-${this.cegContent.elementName}`,
    ) as ElvisComponentWrapper;

    component.setProps({ [key]: value });
  }
}
