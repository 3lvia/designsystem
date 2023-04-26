import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { debounceTime, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ComponentExample } from './component-example';
import { Controls, ControlValue } from './controlType';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Input() fullWidth = false;
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

  constructor(private zone: NgZone, private route: ActivatedRoute, private router: Router) {}

  ngAfterViewInit(): void {
    this.zone.onStable.pipe(takeUntil(this.unsubscriber), first()).subscribe(() => {
      Object.entries(this.route.snapshot.queryParams).forEach(([propName, value]) => {
        const isNumber =
          this.componentExample.cegContent.getControlSnapshot()?.[propName]?.type === 'counter';
        const parsedValue = isNumber ? +value : value;
        this.setPropValue(propName, parsedValue, false);
      });
    });

    this.setUpSlotSubscription();
    this.setUpTypeChangeSubscription();
    this.setUpStaticPropSubscription();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  setPropValue(propName: string, value: ControlValue, setInUrl = true): void {
    const propWasUpdated = this.componentExample.cegContent.setPropValue(propName, value);

    if (propWasUpdated) {
      this.getWebComponent().setProps({ [propName]: value });

      if (setInUrl) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParamsHandling: 'merge',
          queryParams: { [propName]: value },
          replaceUrl: true,
          preserveFragment: true,
        });
      }
    }
  }

  toggleSlot(slotName: string, isVisible: boolean) {
    this.componentExample.cegContent.setPropValue(slotName, isVisible);
  }

  private getUpdatedSlotList(
    slots: {
      slotName: string;
      isVisible: true;
    }[],
  ): Slot[] {
    let slotList: Slot[] = [];

    const slotIsActive = (slotName: string): boolean => {
      return (
        !slots.map((s) => s.slotName).includes(slotName) ||
        !!slots.find((s) => s.slotName === slotName)?.isVisible
      );
    };

    // Use the existing list of slots, if we have it.
    if (this._componentSlots.value.length) {
      slotList = this._componentSlots.value;
      slotList.forEach((slot) => (slot.isActive = slotIsActive(slot.name)));
    } else {
      slotList = Object.entries(this.getWebComponent().getAllSlots()).map(([slotName, slot]) => ({
        html: slot,
        isActive: slotIsActive(slotName),
        name: slotName,
      }));
    }

    return slotList;
  }

  private setUpSlotSubscription() {
    /** We need to wait in order to prevent ExpressionChangeAfterChecked error */
    this.zone.onStable
      .pipe(
        takeUntil(this.unsubscriber),
        debounceTime(50),
        switchMap(() => this.componentExample.cegContent.getSlotVisibility()),
      )
      .subscribe((slots) => {
        const slotList = this.getUpdatedSlotList(slots);

        this._componentSlots.next(slotList);

        const slotObj: SlotMap = {};
        slotList
          .filter((slot) => slot.isActive)
          .forEach((slot) => {
            slotObj[slot.name] = slot.html;
          });
        this.getWebComponent().setSlots(slotObj);
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
