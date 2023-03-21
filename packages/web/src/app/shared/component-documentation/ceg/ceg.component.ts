import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentExample } from './componentExample';
import { ControlConfiguration, Controls, ControlValue } from './controlType';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { isControl, isGroup } from './helpers';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements OnInit {
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) cegContent: ComponentExample;
  selectedControls = new BehaviorSubject<Controls>({});

  get controlsList() {
    return this.cegContent.controls.pipe(map((controls) => (Array.isArray(controls) ? controls : [])));
  }

  ngOnInit(): void {
    if (Array.isArray(this.cegContent.controls.value)) {
      const firstControls = this.cegContent.controls.value[0];
      this.selectedControls.next(this.clone(firstControls.controls));
    } else {
      this.selectedControls.next(this.clone(this.cegContent.controls.value));
    }
  }

  setPropValue(event: { key: string; value: ControlValue }): void {
    const updatedConfig = this.updateValue(this.selectedControls.value, event.key, event.value);

    this.selectedControls.next(updatedConfig);
    this.setPropOnWebComponent(event.key, event.value);
  }

  setControls(configuration: ControlConfiguration): void {
    this.selectedControls.next(this.clone(configuration.controls));
    this.cegContent.currentControl?.next(configuration.name);
  }

  /**
   * We clone the control objects to prevent mutating the original configuration.
   * This allows us to reset the controls to the original state when the CEG
   * type is changed.
   */
  private clone<T>(controls: T): T {
    return JSON.parse(JSON.stringify(controls));
  }

  private updateValue(controls: Controls, key: string, newValue: ControlValue): Controls {
    for (let control of Object.keys(controls)) {
      const c = controls[control];

      if (control === key && isControl(c)) {
        c.value = newValue;
        return;
      } else if (isGroup(c)) {
        this.updateValue(c.controls, key, newValue);
      }
    }

    return controls;
  }

  private setPropOnWebComponent(key: string, value: ControlValue): void {
    const component = this.componentContainer.nativeElement.querySelector(
      `elvia-${this.cegContent.elementName}`,
    ) as ElvisComponentWrapper;

    component.setProps({ [key]: value });
  }
}
