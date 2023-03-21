import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentExample } from './componentExample';
import { ControlConfiguration, Controls, ControlValue } from './controlType';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { isControl, isGroup } from './helpers';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements OnInit {
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) cegContent: ComponentExample;
  selectedControls = new BehaviorSubject<Controls>({});

  get hasMultipleConfigurations() {
    const controls = this.cegContent.controls.value;
    return Array.isArray(controls) && controls.length > 1;
  }

  ngOnInit(): void {
    if (Array.isArray(this.cegContent.controls.value)) {
      const firstControls = this.cegContent.controls.value[0];
      this.selectedControls.next(firstControls.controls);
    } else {
      this.selectedControls.next(this.cegContent.controls.value);
    }
  }

  setPropValue(event: { key: string; value: ControlValue }): void {
    const config = { ...this.selectedControls.value };

    this.updateValue(config, event.key, event.value);

    this.selectedControls.next(config);
    this.setPropOnWebComponent(event.key, event.value);
  }

  setControls(configuration: ControlConfiguration): void {
    this.selectedControls.next(configuration.controls);
    this.cegContent.currentControl.next(configuration.name);
  }

  private updateValue(controls: Controls, key: string, value: ControlValue): void {
    for (let control of Object.keys(controls)) {
      const c = controls[control];

      if (control === key && isControl(c)) {
        c.value = value;
        return;
      } else if (isGroup(c)) {
        this.updateValue(c.controls, key, value);
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
