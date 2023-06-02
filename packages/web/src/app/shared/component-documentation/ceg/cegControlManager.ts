import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  CegControl,
  ComponentType,
  Controls,
  ControlValue,
  SlotVisibility,
  StaticProps,
} from './controlType';

export type UnknownCegControlManager = CegControlManager<Record<string, any>>;

export class CegControlManager<TComponentProps extends Record<string, any>> {
  private changedPropsWithInitialValues = new Map<keyof TComponentProps, ControlValue>();
  private _componentTypes = new BehaviorSubject<ComponentType<TComponentProps>[]>([]);
  componentTypes = this._componentTypes.asObservable();

  private _currentComponentTypeName = new BehaviorSubject<string | undefined>(undefined);
  currentComponentTypeName = this._currentComponentTypeName.asObservable().pipe(distinctUntilChanged());

  constructor(
    /**
     * The controls that appear in the side panel to control the component.
     *
     * Defined as an array of component types.
     */
    controls: ComponentType<TComponentProps>[],
  ) {
    this._componentTypes.next(controls);
    this._currentComponentTypeName.next(controls[0].type);
  }

  getCurrentControls(): Observable<Controls<TComponentProps> | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.controls));
  }

  getControlSnapshot(): Controls<TComponentProps> | undefined {
    const typeIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[typeIndex]?.controls;
  }

  getCurrentControlGroupOrder(): Observable<string[] | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.groupOrder));
  }

  getGroupOrderSnapshot(): string[] | undefined {
    const typeIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[typeIndex]?.groupOrder;
  }

  getStaticProps(): Observable<Partial<StaticProps<TComponentProps>> | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.staticProps));
  }

  getStaticPropsSnapshot(): Partial<StaticProps<TComponentProps>> | undefined {
    const typeIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[typeIndex]?.staticProps;
  }

  getCurrentComponentTypeNameSnapshot(): string | undefined {
    return this._currentComponentTypeName.value;
  }

  setActiveComponentTypeName(name: string): void {
    // Reset props to default values
    this.changedPropsWithInitialValues.forEach((value, key) => this.setPropValue(key, value));
    this.changedPropsWithInitialValues.clear();

    this._currentComponentTypeName.next(name);
  }

  getSlotVisibility(): Observable<SlotVisibility[]> {
    return this.getCurrentControls().pipe(
      map((controls) => {
        const typeIndex = this.getCurrentComponentTypeIndex();
        const hiddenSlots = this._componentTypes.value[typeIndex]?.hiddenSlots?.map((slotName) => ({
          slotName: slotName,
          isVisible: false,
        }));

        const toggles = Object.entries(controls || {}).filter(
          ([slotName, control]: [string, CegControl]) =>
            control?.type === 'slotToggle' &&
            !hiddenSlots?.find((hiddenSlot) => hiddenSlot.slotName === slotName),
        );

        return toggles
          .map(([controlName, control]) => ({
            slotName: controlName,
            isVisible: !!control?.value,
          }))
          .concat(hiddenSlots ?? []);
      }),
    );
  }

  getDisabledControls(): Observable<(keyof TComponentProps)[]> {
    return this.getCurrentControls().pipe(
      map((currentControls) => {
        const typeIndex = this.getCurrentComponentTypeIndex();
        const disableMap = this._componentTypes.value[typeIndex].disabledControls;

        if (!disableMap) {
          return [];
        }

        return Object.entries(disableMap)
          .filter(([_, disabledBy]) => {
            const controlValues =
              disabledBy?.map((controlName) => !!currentControls?.[controlName]?.value) || [];
            return controlValues.some((controlValue) => controlValue === true);
          })
          .map(([controlName]) => controlName);
      }),
    );
  }

  /**
   *
   * @param propName The name of the prop to be updated
   * @param value The new value of the prop
   * @returns The updated control, if the prop was updated.
   */
  setPropValue(
    propName: keyof TComponentProps,
    value: ControlValue,
  ): CegControl<TComponentProps> | undefined {
    this.storeInitialValueForProp(propName);

    const typeIndex = this.getCurrentComponentTypeIndex();
    const listClone = this.clone(this._componentTypes.value);

    const prop = listClone[typeIndex].controls[propName];
    if (prop) {
      prop.value = value;
      this._componentTypes.next(listClone);
      return prop;
    }

    return undefined;
  }

  getChangedPropsWithInitialValues(): Record<string, ControlValue> {
    return Object.fromEntries(this.changedPropsWithInitialValues);
  }

  private storeInitialValueForProp(propName: keyof TComponentProps): void {
    if (!this.changedPropsWithInitialValues.has(propName)) {
      const value = this.getControlSnapshot()?.[propName]?.value;
      this.changedPropsWithInitialValues.set(propName, value);
    }
  }

  private getCurrentComponentTypeIndex(): number {
    return this._componentTypes.value.findIndex((conf) => conf.type === this._currentComponentTypeName.value);
  }

  private getCurrentComponentType(): Observable<ComponentType<TComponentProps> | undefined> {
    return combineLatest([this.componentTypes, this.currentComponentTypeName]).pipe(
      map(([componentTypes, name]) => {
        return componentTypes.find((configuration) => configuration.type === name);
      }),
    );
  }

  private clone = <T>(controls: T): T => {
    return JSON.parse(JSON.stringify(controls));
  };
}
