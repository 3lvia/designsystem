import { AfterViewInit, Component, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ComponentExample } from './componentExample';
import { ControlValue } from './controlType';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements AfterViewInit {
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) componentExample: ComponentExample;
  private _componentSlots = new BehaviorSubject<string[]>([]);
  componentSlots = this._componentSlots.asObservable();

  get hasMultipleComponentTypes() {
    return this.componentExample.cegContent.configurations.pipe(
      map((configurations) => configurations.length > 1),
    );
  }

  get hasCustomText() {
    return this.componentExample.cegContent
      .getCurrentCustomTexts()
      .pipe(map((customTexts) => customTexts && Object.keys(customTexts).length > 0));
  }

  ngAfterViewInit(): void {
    if (!this.componentExample) {
      console.error(
        'No CEG content found. Please create a component that extends the "ComponentExample" interface and provide it as a child to the <app-ceg> component.',
      );
    }

    const component = this.componentContainer.nativeElement.querySelector(
      `elvia-box`,
    ) as ElvisComponentWrapper;
    const slots = Object.values(component.getAllSlots()).map((slot) => slot.outerHTML);

    setTimeout(() => {
      this._componentSlots.next(slots);
    });
  }

  setPropValue(propName: string, value: ControlValue): void {
    const propWasUpdated = this.componentExample.cegContent.setPropValue(propName, value);

    if (propWasUpdated) {
      this.setPropOnWebComponent(propName, value);
    }
  }

  private setPropOnWebComponent(key: string, value: ControlValue): void {
    const component = this.componentContainer.nativeElement.querySelector(
      `elvia-${this.componentExample.elementName}`,
    ) as ElvisComponentWrapper;

    component.setProps({ [key]: value });
  }
}
