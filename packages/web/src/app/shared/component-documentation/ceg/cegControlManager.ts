import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CegControl, CegCustomText, ComponentType, Controls, ControlValue } from './controlType';

export class CegControlManager {
  private _componentTypes = new BehaviorSubject<ComponentType[]>([]);
  componentTypes = this._componentTypes.asObservable();

  private _currentComponentTypeName = new BehaviorSubject('');
  currentComponentTypeName = this._currentComponentTypeName.asObservable();

  private initialTextValues: CegCustomText | undefined;

  constructor(
    /**
     * The controls that appear in the side panel to control the component.
     *
     * Defined as an array of component types.
     */
    controls: ComponentType[],
  ) {
    this._componentTypes.next(controls);
    this._currentComponentTypeName.next(controls[0].name);
    this.initialTextValues = controls[0].customText ? this.clone(controls[0].customText) : undefined;
  }

  getCurrentControls(): Observable<Controls | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.controls));
  }

  getControlSnapshot(): Controls | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[confIndex]?.controls;
  }

  getCurrentCustomTexts(): Observable<CegCustomText | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.customText));
  }

  getCustomTextSnapshot(): CegCustomText | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._componentTypes.value[confIndex]?.customText;
  }

  getCurrentControlGroupOrder(): Observable<string[] | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.groupOrder));
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
  setPropValue(propName: string, value: ControlValue): boolean {
    let propWasUpdated = false;
    const confIndex = this.getCurrentComponentTypeIndex();
    const listClone = this.clone(this._componentTypes.value);

    // First we check if the prop is in the props-array
    const prop = this.getControl(listClone[confIndex], propName);
    if (prop) {
      prop.value = value;
      propWasUpdated = true;
    } else {
      // If not, then we check if it's a custom text
      const customText = listClone[confIndex]?.customText?.[propName];
      if (customText && typeof value === 'string') {
        customText.value = value;
        propWasUpdated = true;
      }
    }

    if (propWasUpdated) {
      this._componentTypes.next(listClone);
    }

    return propWasUpdated;
  }

  resetCustomTexts(): void {
    const componentTypesClone = this.clone(this._componentTypes.value);
    componentTypesClone[this.getCurrentComponentTypeIndex()].customText = this.clone(this.initialTextValues);

    this._componentTypes.next(componentTypesClone);
  }

  private getCurrentComponentTypeIndex(): number {
    return this._componentTypes.value.findIndex((conf) => conf.name === this._currentComponentTypeName.value);
  }

  private getControl(configuration: ComponentType, propName: string): CegControl | undefined {
    const topLevelControl = configuration.controls[propName];
    if (topLevelControl) {
      return topLevelControl;
    }

    for (let control of Object.values(configuration.controls)) {
      if (control.type === 'checkbox' && control.children) {
        const child = Object.entries(control.children).find(([key]) => key === propName)?.[1];

        if (child) {
          return child;
        }
      }
    }
  }

  private getCurrentComponentType(): Observable<ComponentType | undefined> {
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
