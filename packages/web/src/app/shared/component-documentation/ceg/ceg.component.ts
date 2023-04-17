import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ComponentExample } from './component-example';
import { Controls, ControlValue } from './controlType';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

interface Slot {
  name: string;
  html: Element;
  isActive: boolean;
}

interface SlotMap {
  [key: string]: Element;
}

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss', './shared-styles.scss'],
})
export class CegComponent implements AfterViewInit, OnDestroy {
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) componentExample: ComponentExample;
  private unsubscriber = new Subject();
  private _componentSlots = new BehaviorSubject<Slot[]>([]);
  readonly componentSlots = this._componentSlots
    .asObservable()
    .pipe(map((slots) => slots.filter((slot) => slot.isActive).map((slot) => slot.html.outerHTML)));

  get hasMultipleComponentTypes() {
    return this.componentExample.cegContent.componentTypes.pipe(
      map((componentTypes) => componentTypes.length > 1),
    );
  }

  get hasControlsForType(): Observable<boolean> {
    return this.componentExample.cegContent.getCurrentControls().pipe(
      map((controls) => !!(controls && Object.keys(controls).length > 0)),
      takeUntil(this.unsubscriber),
    );
  }

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.setUpSlotSubscription();
    this.setUpTypeChangeSubscription();
    this.setUpStaticPropSubscription();
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

  toggleSlot(slotName: string, isVisible: boolean) {
    this.componentExample.cegContent.setPropValue(slotName, isVisible);
  }

  private setUpSlotSubscription() {
    this.zone.onStable
      .pipe(
        takeUntil(this.unsubscriber),
        first(),
        switchMap(() => this.componentExample.cegContent.getSlotVisibility()),
      )
      .subscribe((slots) => {
        let slotObject = this.getWebComponent().getAllSlots();

        if (this._componentSlots.value.length) {
          const existingSlotsToObject: SlotMap = {};
          this._componentSlots.value.forEach((slot) => {
            existingSlotsToObject[slot.name] = slot.html;
          });
          slotObject = existingSlotsToObject;
        }

        const mappedSlots: Slot[] = Object.entries(slotObject).map(([slotName, slot]) => ({
          html: slot,
          isActive:
            !slots.map((slot) => slot.slotName).includes(slotName) ||
            !!slots.find((slot) => slot.slotName === slotName)?.isVisible,
          name: slotName,
        }));

        const slotObj: SlotMap = {};
        mappedSlots
          .filter((slot) => slot.isActive)
          .forEach((slot) => {
            slotObj[slot.name] = slot.html;
          });
        this.getWebComponent().setSlots(slotObj);

        this._componentSlots.next(mappedSlots);
      });
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
        if (controls) {
          this.setAllPropsOnWebComponent(controls);
        }
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
        }, {} as Record<string, any>);
        this.getWebComponent().setProps(propsToInclude);
      });
  }

  private setAllPropsOnWebComponent(controls: Controls): void {
    Object.entries(controls).forEach(([controlName, control]) => {
      if (control && control.type !== 'slotToggle') {
        this.getWebComponent().setProps({ [controlName]: control.value });
      }
    });
  }

  private getWebComponent() {
    return this.componentContainer.nativeElement.querySelector(
      `elvia-${this.componentExample.elementName}`,
    ) as ElvisComponentWrapper;
  }
}
