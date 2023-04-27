import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CegControl, ComponentType, Controls, ControlValue, StaticProps } from './controlType';

export type UnknownCegControlManager = CegControlManager<Record<string, any>>;

export class CegControlManager<TComponentProps extends Record<string, any>> {
  private _componentTypes = new BehaviorSubject<ComponentType<TComponentProps>[]>([]);
  componentTypes = this._componentTypes.asObservable();

  private _currentComponentTypeName = new BehaviorSubject<string | undefined>(undefined);
  currentComponentTypeName = this._currentComponentTypeName.asObservable();

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
    this._currentComponentTypeName.next(name);
  }

  getSlotVisibility(): Observable<{ slotName: string; isVisible: true }[]> {
    return this.getCurrentControls().pipe(
      map((controls: Controls | undefined) => {
        const typeIndex = this.getCurrentComponentTypeIndex();
        const hiddenSlots = this._componentTypes.value[typeIndex]?.hiddenSlots?.map((slotName) => ({
          slotName: slotName,
          isVisible: false,
        }));

        const toggles = Object.entries(controls ?? {}).filter(
          ([slotName, control]) =>
            control?.type === 'slotToggle' &&
            !hiddenSlots?.find((hiddenSlot) => hiddenSlot.slotName === slotName),
        );
        return toggles
          .map(([controlName, control]) => ({
            slotName: controlName,
            isVisible: control?.value,
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
   * @returns true/false to indicate if the prop was updated or not.
   */
  setPropValue(propName: keyof TComponentProps, value: ControlValue): boolean {
    let propWasUpdated = false;
    const typeIndex = this.getCurrentComponentTypeIndex();
    const listClone = this.clone(this._componentTypes.value);

    // First we check if the prop is in the props-array
    const prop = this.getControl(listClone[typeIndex], propName);
    if (prop) {
      prop.value = value;
      propWasUpdated = true;
    }

    if (propWasUpdated) {
      this._componentTypes.next(listClone);
    }

    return propWasUpdated;
  }

  private getCurrentComponentTypeIndex(): number {
    return this._componentTypes.value.findIndex((conf) => conf.type === this._currentComponentTypeName.value);
  }

  private getControl(
    configuration: ComponentType<TComponentProps>,
    propName: keyof TComponentProps,
  ): CegControl | undefined {
    const topLevelControl = configuration.controls[propName];
    if (topLevelControl) {
      return topLevelControl;
    }

    const controls = Object.values(configuration.controls) as CegControl[];
    for (let control of controls) {
      if (control.type === 'checkbox' && control.children) {
        const child = Object.entries(control.children).find(([key]) => key === propName)?.[1];

        if (child) {
          return child;
        }
      }
    }
    return undefined;
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
