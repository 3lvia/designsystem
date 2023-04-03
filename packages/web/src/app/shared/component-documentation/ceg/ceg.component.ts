import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ComponentExample } from './componentExample';
import { Controls, ControlValue } from './controlType';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';

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
  readonly componentSlots = this._componentSlots.asObservable();

  get hasMultipleComponentTypes() {
    return this.componentExample.cegContent.componentTypes.pipe(
      map((componentTypes) => componentTypes.length > 1),
    );
  }

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.setUpSlotSubscription();
    this.setUpTypeChangeSubscription();
    this.setUpStaticPropSubscription();
    this.setDisplayStyleOnExampleComponent();
    this.setAllPropsOnWebComponent(this.componentExample.cegContent.getControlSnapshot());
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

  private setUpSlotSubscription() {
    this.componentExample.cegContent.currentComponentTypeName
      .pipe(
        takeUntil(this.unsubscriber),
        /** We need to wait in order to prevent ExpressionChangeAfterChecked error  */
        switchMap(() => this.zone.onStable),
        map(() => Object.values(this.getWebComponent().getAllSlots()).map((slot) => slot.outerHTML)),
      )
      .subscribe((slots) => this._componentSlots.next(slots));
  }

  private setUpTypeChangeSubscription() {
    combineLatest([
      this.componentExample.cegContent.currentComponentTypeName,
      this.componentExample.cegContent.getCurrentControls(),
    ])
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(([type, controls]) => {
        if (type) {
          this.getWebComponent().setProps({ type: type.toLowerCase() });
        }
        this.setAllPropsOnWebComponent(controls);
      });
  }

  private setUpStaticPropSubscription() {
    this.componentExample.cegContent
      .getStaticProps()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((props) => {
        if (!props) {
          return;
        }

        const propsToInclude = Object.entries(props).reduce((acc, [key, value]) => {
          if (typeof value !== 'function') {
            acc[key] = value;
          }
          return acc;
        }, {});
        this.getWebComponent().setProps(propsToInclude);
      });
  }

  private setDisplayStyleOnExampleComponent() {
    // By setting "display: contents" on the host, isFullWidth works as expected.
    const cegContent = this.componentContainer.nativeElement.firstChild as HTMLElement;
    cegContent.style.display = 'contents';
  }

  private setAllPropsOnWebComponent(controls: Controls): void {
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
