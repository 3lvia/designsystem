import {
  AfterContentInit,
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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ComponentExample } from './component-example';
import { Controls, ControlValue, SlotVisibility } from './controlType';
import { ActivatedRoute, Router } from '@angular/router';
import { TypescriptComponentExample } from './typescript-component-example';

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
export class CegComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @Input() fullWidth = false;
  @ViewChild('componentContainer') componentContainer: ElementRef<HTMLDivElement>;
  @ContentChild(ComponentExample, { static: true }) componentExample: ComponentExample;
  @ContentChild(TypescriptComponentExample, { static: true }) tsComponentExample: TypescriptComponentExample;
  private unsubscriber = new Subject();
  private _componentSlots = new BehaviorSubject<Slot[]>([]);
  readonly componentSlots = this._componentSlots
    .asObservable()
    .pipe(map((slots) => slots.filter((slot) => slot.isActive).map((slot) => slot.html.outerHTML)));

  typeScriptCode: Observable<string> | undefined;

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
    this.setCegStateFromURL();
    this.setUpSlotSubscription();
    this.setUpTypeChangeSubscription();
    this.setUpStaticPropSubscription();
  }

  ngAfterContentInit(): void {
    if (this.tsComponentExample) {
      this.typeScriptCode = this.tsComponentExample.typeScript.pipe(takeUntil(this.unsubscriber));
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  setPropValue(propName: string, value: ControlValue): void {
    const updatedProp = this.componentExample.cegContent.setPropValue(propName, value);

    if (updatedProp) {
      if (!updatedProp.excludedFromDomProps) {
        this.getWebComponent().setProps({ [propName]: value });
      }
      this.patchPropValueInUrl(propName, value);
    }
  }

  toggleSlot(slotName: string, isVisible: boolean) {
    this.componentExample.cegContent.setPropValue(slotName, isVisible);
    this.patchPropValueInUrl(slotName, isVisible);
  }

  setComponentType(typeName: string): void {
    const initialValues = this.componentExample.cegContent.getChangedPropsWithInitialValues();
    this.getWebComponent().setProps(initialValues);

    this.componentExample.cegContent.setActiveComponentTypeName(typeName);
    this.patchPropValueInUrl('type', typeName, false);
  }

  private setCegStateFromURL(): void {
    this.zone.onStable.pipe(takeUntil(this.unsubscriber), first()).subscribe(() => {
      const componentType = this.route.snapshot.queryParamMap.get('type');
      if (componentType) {
        this.componentExample.cegContent.setActiveComponentTypeName(componentType);
      }

      Object.entries(this.route.snapshot.queryParams)
        .filter(([propName]) => propName !== 'type')
        .forEach(([propName, value]) => {
          const control = this.componentExample.cegContent.getControlSnapshot()?.[propName];
          const controlType = control?.type;

          let parsedValue = value;
          if (controlType === 'counter') {
            parsedValue = +value;
          } else if (!!controlType && ['slotToggle', 'checkbox', 'switch'].includes(controlType)) {
            parsedValue = value === 'true';
          }

          const propWasUpdated = this.componentExample.cegContent.setPropValue(propName, parsedValue);

          if (propWasUpdated && controlType !== 'slotToggle' && !control?.excludedFromDomProps) {
            this.getWebComponent().setProps({ [propName]: parsedValue });
          }
        });
    });
  }

  private async patchPropValueInUrl(propName: string, value: ControlValue, merge = true): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: merge ? 'merge' : '',
      queryParams: { [propName]: value },
      replaceUrl: true,
      preserveFragment: true,
    });
  }

  private getUpdatedSlotList(slots: SlotVisibility[]): Slot[] {
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
    this.componentExample.cegContent.currentComponentTypeName
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((type) => {
        const controls = this.componentExample.cegContent.getControlSnapshot();
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
      if (control && control.type !== 'slotToggle' && !control.excludedFromDomProps) {
        this.getWebComponent().setProps({ [controlName]: control.value });
      }
    });
  }

  private getWebComponent() {
    const tagName = `elvia-${this.componentExample.elementName}`;
    const element = this.componentContainer.nativeElement.querySelector(tagName) as ElvisComponentWrapper;

    if (!element) {
      throw new Error(
        `CEG - ${tagName} was not found in the DOM. Ensure that you have spelled the element name correct in the HTML and when implementing the ComponentExample interface.`,
      );
    }

    return element;
  }
}
