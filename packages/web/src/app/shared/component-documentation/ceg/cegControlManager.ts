import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CegControl, CegCustomText, ComponentType, Controls, ControlValue } from './controlType';

export class CegControlManager {
  private _configurations = new BehaviorSubject<ComponentType[]>([]);
  configurations = this._configurations.asObservable();

  private _currentComponentTypeName = new BehaviorSubject('');
  currentComponentTypeName = this._currentComponentTypeName.asObservable();

  private initialTextValues: CegCustomText | undefined;

  constructor(
    /**
     * The controls that appear in the side panel to control the component.
     *
     * Can be defined as a single object (for components with a single type),
     * or as an array of configurations (for components with multiple CEG types).
     *
     * NB: Remember to render separate components for each configuration to reset
     * the component state.
     */
    controls: ComponentType[],
  ) {
    this._configurations.next(controls);
    this._currentComponentTypeName.next(controls[0].name);
    this.initialTextValues = controls[0].customText ? this.clone(controls[0].customText) : undefined;
  }

  getCurrentControls(): Observable<Controls | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.controls));
  }

  getControlSnapshot(): Controls | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._configurations.value[confIndex]?.controls;
  }

  getCurrentCustomTexts(): Observable<CegCustomText | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.customText));
  }

  getCustomTextSnapshot(): CegCustomText | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._configurations.value[confIndex]?.customText;
  }

  getCurrentControlGroupOrder(): Observable<string[] | undefined> {
    return this.getCurrentComponentType().pipe(map((configuration) => configuration?.groupOrder));
  }

  getGroupOrderSnapshot(): string[] | undefined {
    const confIndex = this.getCurrentComponentTypeIndex();
    return this._configurations.value[confIndex]?.groupOrder;
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
    const listClone = this.clone(this._configurations.value);

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
      this._configurations.next(listClone);
    }

    return propWasUpdated;
  }

  resetCustomTexts(): void {
    const configurationsClone = this.clone(this._configurations.value);
    configurationsClone[this.getCurrentComponentTypeIndex()].customText = this.clone(this.initialTextValues);

    this._configurations.next(configurationsClone);
  }

  private getCurrentComponentTypeIndex(): number {
    return this._configurations.value.findIndex((conf) => conf.name === this._currentComponentTypeName.value);
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
    return combineLatest([this.configurations, this.currentComponentTypeName]).pipe(
      map(([configurations, name]) => {
        return configurations.find((configuration) => configuration.name === name);
      }),
    );
  }

  private clone = <T>(controls: T): T => {
    return JSON.parse(JSON.stringify(controls));
  };
}
