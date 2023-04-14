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
    this._currentComponentTypeName.next(controls[0].name);
  }

  getCurrentControls(): Observable<Controls<TComponentProps> | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.controls));
  }

  getControlSnapshot(): Controls<TComponentProps> | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[confIndex]?.controls;
  }

  getCurrentControlGroupOrder(): Observable<string[] | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.groupOrder));
  }

  getStaticProps(): Observable<StaticProps<TComponentProps> | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.staticProps));
  }

  getStaticPropsSnapshot(): StaticProps<TComponentProps> | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[confIndex]?.staticProps;
  }

  getCurrentComponentTypeNameSnapshot(): string | undefined {
    return this._currentComponentTypeName.value;
  }

  getGroupOrderSnapshot(): string[] | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[confIndex]?.groupOrder;
  }

  setActiveComponentTypeName(name: string): void {
    this._currentComponentTypeName.next(name);
  }

  /**
   *
   * @param propName The name of the prop to be updated
   * @param value The new value of the prop
   * @returns true/false to indicate if the prop was updated or not.
   */
  setPropValue(propName: keyof TComponentProps, value: ControlValue): boolean {
    let propWasUpdated = false;
    const confIndex = this.getCurrentComponentTypeIndex();
    const listClone = this.clone(this._componentTypes.value);

    // First we check if the prop is in the props-array
    const prop = this.getControl(listClone[confIndex], propName);
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
    return this._componentTypes.value.findIndex((conf) => conf.name === this._currentComponentTypeName.value);
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
  }

  private getCurrentComponentType(): Observable<ComponentType<TComponentProps> | undefined> {
    return combineLatest([this.componentTypes, this.currentComponentTypeName]).pipe(
      map(([componentTypes, name]) => {
        return componentTypes.find((configuration) => configuration.name === name);
      }),
    );
  }

  private clone = <T>(controls: T): T => {
    return JSON.parse(JSON.stringify(controls));
  };
}
