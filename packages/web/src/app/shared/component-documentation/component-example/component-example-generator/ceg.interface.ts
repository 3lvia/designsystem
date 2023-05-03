import ComponentData from 'src/app/doc-pages/components/component-data.interface';

interface CegFormGroupCommon {
  formType: ComponentData['attributes'][0]['cegFormType'];
  type: ComponentData['attributes'][0]['cegType'];
  propName: Extract<keyof ComponentData['attributes'], string>;
  dependency: ComponentData['attributes'][0]['cegDependency'];
  defaultValue: ComponentData['attributes'][0]['cegDefault'];
}

interface CegFormGroupRadio {
  formType: 'radio';
  label: ComponentData['attributes'][0]['cegDisplayName'];
  formGroupOptions: CegFormGroupOption[];
  labelTypography?: ComponentData['attributes'][0]['cegLabelTypography'];
}

interface CegFormGroupToggle {
  formType: 'toggle';
  label: ComponentData['attributes'][0]['cegDisplayName'];
  propValue: ComponentData['attributes'][0]['cegOption'];
  propSlot: ComponentData['attributes'][0]['cegSlot'];
  displayGroup: ComponentData['attributes'][0]['cegDisplayGroup'];
}

interface CegFormGroupCounter {
  formType: 'counter';
  label: ComponentData['attributes'][0]['cegDisplayName'];
  counterMax: ComponentData['attributes'][0]['cegCounterMax'];
  counterMin: ComponentData['attributes'][0]['cegCounterMin'];
  counterStepValue: ComponentData['attributes'][0]['cegStepValue'];
  counterType: ComponentData['attributes'][0]['cegCounterType'];
}

interface CegFormGroupCheckbox {
  formType: 'checkbox';
  label?: ComponentData['attributes'][0]['cegDisplayName'];
  name: ComponentData['attributes'][0]['cegDisplayName'];
  propValue: ComponentData['attributes'][0]['cegOption'];
  formGroupOptions?: CegFormGroupOption[];
}

export type CegFormGroup = CegFormGroupCommon &
  (CegFormGroupRadio | CegFormGroupToggle | CegFormGroupCounter | CegFormGroupCheckbox);

export interface CegFormGroupOption {
  name: string;
  label?: string;
  defaultValue: boolean;
  formType?: ComponentData['attributes'][0]['cegFormType'];
  propValue?: string;
  propName?: string;
  dependency?: ComponentData['attributes'][0]['cegDependency'];
}

export interface FormState {
  [key: string]: string;
}

/**
 * Type of elvia-dropdown event.
 */
export type DropdownEvent = CustomEvent<{
  value: string;
}>;

/**
 * Type of event emitted from `ceg-filters.component` to `component-example-generator.component` whenever a side filter is changed.
 */
export interface CegSideFilterEvent {
  /**
   * Name of changed prop.
   */
  name: string;
  /**
   * Either the new chosen value, or `'true'` or `'false'` if the side filter changes visibility of the prop.
   */
  value: string | number | boolean;
}

/**
 * All codes that are shown in the CEG.
 *
 * **NB**: Keys must correspond with languages used in `example-code.service.ts`.
 */
export interface CegCodes {
  react: ComponentData['codeReact'];
  angular: ComponentData['codeAngular'];
  vue: ComponentData['codeVue'];
  native: ComponentData['codeNativeHTML'];
}
