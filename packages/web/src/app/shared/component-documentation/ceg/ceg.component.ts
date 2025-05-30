import { AsyncPipe, Location, NgClass } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  booleanAttribute,
  contentChild,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { DynamicCodeGeneratorComponent } from './code-generator/dynamic-code-generator/dynamic-code-generator.component';
import { ComponentExample } from './component-example';
import { ControlValue, Controls, SlotVisibility } from './controlType';
import { ControlsPopoverComponent } from './controls-popover/controls-popover.component';
import { ControlsComponent } from './controls/controls.component';
import { TypeSwitcherComponent } from './type-switcher/type-switcher.component';
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
  imports: [
    TypeSwitcherComponent,
    NgClass,
    ControlsPopoverComponent,
    ControlsComponent,
    DynamicCodeGeneratorComponent,
    AsyncPipe,
  ],
})
export class CegComponent implements AfterViewInit, AfterContentInit {
  private zone = inject(NgZone);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);

  readonly fullWidth = input(false, { transform: booleanAttribute });

  readonly componentContainer = viewChild.required<ElementRef<HTMLDivElement>>('componentContainer');
  readonly componentExample = contentChild.required(ComponentExample);
  readonly tsComponentExample = contentChild(TypescriptComponentExample);

  private readonly destroyRef = inject(DestroyRef);

  private _componentSlots = new BehaviorSubject<Slot[]>([]);
  readonly componentSlots = this._componentSlots
    .asObservable()
    .pipe(map((slots) => slots.filter((slot) => slot.isActive).map((slot) => slot.html.outerHTML)));

  typeScriptCode: Observable<string> | undefined;

  get hasMultipleComponentTypes() {
    return this.componentExample().cegContent.componentTypes.pipe(
      map((componentTypes) => componentTypes.length > 1),
    );
  }

  get hasControlsForType(): Observable<boolean> {
    return this.componentExample()
      .cegContent.getCurrentControls()
      .pipe(
        map((controls) => !!(controls && Object.keys(controls).length > 0)),
        takeUntilDestroyed(this.destroyRef),
      );
  }

  ngAfterContentInit(): void {
    const tsComponentExample = this.tsComponentExample();
    if (tsComponentExample) {
      this.typeScriptCode = tsComponentExample.typeScript.pipe(takeUntilDestroyed(this.destroyRef));
    }
  }

  ngAfterViewInit(): void {
    this.setCegStateFromURL();

    if (this.hasWebComponent()) {
      this.setUpSlotSubscription();
      this.setUpTypeChangeSubscription();
      this.setUpStaticPropSubscription();
    }
  }

  setPropValue(propName: string, value: ControlValue): void {
    const updatedProp = this.componentExample().cegContent.setPropValue(propName, value);

    if (updatedProp) {
      if (!updatedProp.excludedFromDOM) {
        this.getWebComponent().setProps({ [propName]: value });
      }
      this.patchPropValueInUrl(propName, value);
    }
  }

  toggleSlot(slotName: string, isVisible: boolean) {
    this.componentExample().cegContent.setPropValue(slotName, isVisible);
    this.patchPropValueInUrl(slotName, isVisible);
  }

  setComponentType(typeName: string): void {
    const initialValues = this.componentExample().cegContent.getChangedPropsWithInitialValues();
    this.getWebComponent().setProps(initialValues);

    this.componentExample().cegContent.setActiveComponentTypeName(typeName);
    this.patchPropValueInUrl('type', typeName, false);
  }

  private setCegStateFromURL(): void {
    this.zone.onStable.pipe(takeUntilDestroyed(this.destroyRef), first()).subscribe(() => {
      const componentType = this.activatedRoute.snapshot.queryParamMap.get('type');
      if (componentType) {
        this.componentExample().cegContent.setActiveComponentTypeName(componentType);
      }

      Object.entries(this.getNewestParamMap())
        .filter(([propName]) => propName !== 'type')
        .forEach(([propName, value]) => {
          const componentExample = this.componentExample();
          const control = componentExample.cegContent.getControlSnapshot()?.[propName];
          const controlType = control?.type;

          let parsedValue: ControlValue = value;
          if (controlType === 'counter') {
            parsedValue = +value;
          } else if (!!controlType && ['slotToggle', 'checkbox', 'switch'].includes(controlType)) {
            parsedValue = value === 'true';
          }

          const propWasUpdated = componentExample.cegContent.setPropValue(propName, parsedValue);

          if (propWasUpdated && controlType !== 'slotToggle' && !control?.excludedFromDOM) {
            this.getWebComponent().setProps({ [propName]: parsedValue });
          }
        });
    });
  }

  private patchPropValueInUrl(propName: string, value: ControlValue, merge = true): void {
    const currentUrl = this.location.path().split('?')[0];
    const params = new HttpParams({
      fromObject: merge ? this.getNewestParamMap() : {},
    }).set(propName, value ?? '');
    // @ts-expect-error TS2345 (LEGO-3683)
    this.location.replaceState(currentUrl, params.toString());
  }

  private getNewestParamMap() {
    const params = new HttpParams({ fromString: this.location.path().split('?')[1] ?? '' });
    const paramMap = params.keys().reduce(
      (map, prop) => {
        map[prop] = params.get(prop) ?? '';
        return map;
      },
      {} as Record<string, string>,
    );
    return paramMap;
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
        debounceTime(50),
        switchMap(() => this.componentExample().cegContent.getSlotVisibility()),
        takeUntilDestroyed(this.destroyRef),
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
    this.componentExample()
      .cegContent.currentComponentTypeName.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((type) => {
        const controls = this.componentExample().cegContent.getControlSnapshot();
        if (type) {
          this.getWebComponent().setProps({ type: type.toLowerCase() });
        }
        if (controls) {
          this.setAllPropsOnWebComponent(controls);
        }
      });
  }

  private setUpStaticPropSubscription() {
    this.componentExample()
      .cegContent.getStaticProps()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((props) => {
        if (!props) {
          return;
        }

        const propsToInclude = Object.entries(props).reduce(
          (acc, [key, value]) => {
            if (typeof value !== 'function') {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, any>,
        );
        this.getWebComponent().setProps(propsToInclude);
      });
  }

  private setAllPropsOnWebComponent(controls: Controls): void {
    Object.entries(controls).forEach(([controlName, control]) => {
      if (control && control.type !== 'slotToggle' && !control.excludedFromDOM) {
        this.getWebComponent().setProps({ [controlName]: control.value });
      }
    });
  }

  private hasWebComponent() {
    const tagName = `elvia-${this.componentExample().elementName}`;
    return !!this.componentContainer().nativeElement.querySelector(tagName);
  }

  private getWebComponent() {
    const tagName = `elvia-${this.componentExample().elementName}`;
    const element = this.componentContainer().nativeElement.querySelector(tagName) as ElvisComponentWrapper;

    if (!element) {
      throw new Error(
        `CEG - ${tagName} was not found in the DOM. Ensure that you have spelled the element name correct in the HTML and when implementing the ComponentExample interface.`,
      );
    }

    return element;
  }
}
