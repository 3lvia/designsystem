import { Component, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { ComponentExample } from './componentExample';
import { CegControl, CegControlGroup, Controls, ControlValue } from './controlType';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent {
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) cegContent: ComponentExample;

  setPropValue(event: { key: string; value: ControlValue }): void {
    const config = { ...this.cegContent.controls.value };

    this.updateValue(config, event.key, event.value);

    this.cegContent.controls.next(config);
    this.setPropOnWebComponent(event.key, event.value);
  }

  private updateValue(controls: Controls, key: string, value: ControlValue): void {
    for (let control of Object.keys(controls)) {
      const c = controls[control];

      if (control === key && this.isControl(c)) {
        c.value = value;
        return;
      } else if (this.isGroup(c)) {
        this.updateValue(c.controls, key, value);
      }
    }
  }

  private isControl(control: CegControlGroup | CegControl): control is CegControl {
    return 'type' in control;
  }

  private isGroup(control: CegControlGroup | CegControl): control is CegControlGroup {
    return 'title' in control;
  }

  private setPropOnWebComponent(key: string, value: ControlValue): void {
    const component = this.componentContainer.nativeElement.querySelector(
      `elvia-${this.cegContent.elementName}`,
    ) as ElvisComponentWrapper;

    component.setProps({ [key]: value });
  }
}
