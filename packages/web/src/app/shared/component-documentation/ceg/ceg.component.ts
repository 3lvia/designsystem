import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentExample } from './componentExample';
import { ControlConfiguration, ControlValue } from './controlType';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
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
  selectedConfiguration = new BehaviorSubject<ControlConfiguration>({
    controls: {},
    name: '',
    groupOrder: [],
  });

  get hasMultipleConfigurations() {
    return this.cegContent.controls.pipe(map((configurations) => configurations.length > 1));
  }

  ngOnInit(): void {
    const firstControls = this.cegContent.controls.value[0];
    this.selectedConfiguration.next(this.clone(firstControls));
  }

  setPropValue(event: { key: string; value: ControlValue }): void {
    const existingControl = this.selectedConfiguration.value.controls[event.key];
    existingControl.value = event.value;

    this.setPropOnWebComponent(event.key, event.value);
  }

  setControls(configuration: ControlConfiguration): void {
    this.selectedConfiguration.next(this.clone(configuration));
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

  private setPropOnWebComponent(key: string, value: ControlValue): void {
    const component = this.componentContainer.nativeElement.querySelector(
      `elvia-${this.cegContent.elementName}`,
    ) as ElvisComponentWrapper;

    component.setProps({ [key]: value });
  }
}
