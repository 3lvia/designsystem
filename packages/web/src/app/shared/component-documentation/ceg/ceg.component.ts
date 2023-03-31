import { AfterViewInit, Component, ContentChild, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ComponentExample } from './componentExample';
import { ControlValue } from './controlType';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements AfterViewInit, OnDestroy {
  private unsubscriber = new Subject();
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) componentExample: ComponentExample;
  private _componentSlots = new BehaviorSubject<string[]>([]);
  componentSlots = this._componentSlots.asObservable();

  get hasMultipleComponentTypes() {
    return this.componentExample.cegContent.componentTypes.pipe(
      map((componentTypes) => componentTypes.length > 1),
    );
  }

  ngAfterViewInit(): void {
    this.componentExample.cegContent.currentComponentTypeName
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((type) => {
        const slots = Object.values(this.getWebComponent().getAllSlots()).map((slot) => slot.outerHTML);
        this._componentSlots.next(slots);

        if (type) {
          this.getWebComponent().setProps({ type: type.toLowerCase() });
        }
      });

    this.componentExample.cegContent
      .getStaticProps()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((props) => {
        const propsToInclude = Object.entries(props).reduce((acc, [key, value]) => {
          if (typeof value !== 'function') {
            acc[key] = value;
          }
          return acc;
        }, {});
        this.getWebComponent().setProps(propsToInclude);
      });

    this.setDisplayStyleOnExampleComponent();
    this.setAllPropsOnWebComponent();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  setPropValue(propName: string, value: ControlValue): void {
    const propWasUpdated = this.componentExample.cegContent.setPropValue(propName, value);

    if (propWasUpdated) {
      this.getWebComponent().setProps({ [propName]: value });
    }
  }

  private setDisplayStyleOnExampleComponent() {
    // By setting "display: contents" on the host, isFullWidth works as expected.
    const cegContent = this.componentContainer.nativeElement.firstChild as HTMLElement;
    cegContent.style.display = 'contents';
  }

  private setAllPropsOnWebComponent(): void {
    const controls = this.componentExample.cegContent.getControlSnapshot();
    Object.entries(controls).forEach(([controlName, control]) => {
      this.getWebComponent().setProps({ [controlName]: control.value });
    });
  }

  private getWebComponent() {
    return this.componentContainer.nativeElement.querySelector(
      `elvia-${this.componentExample.elementName}`,
    ) as ElvisComponentWrapper;
  }
}
