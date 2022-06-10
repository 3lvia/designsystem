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
  propSlot: ComponentData['attributes'][0]['cegSlot'];
  counterMax: ComponentData['attributes'][0]['cegCounterMax'];
  counterMin: ComponentData['attributes'][0]['cegCounterMin'];
  counterStepValue: ComponentData['attributes'][0]['cegStepValue'];
  counterType: ComponentData['attributes'][0]['cegCounterType'];
}

interface CegFormGroupCheckbox {
  formType: 'checkbox';
  name: ComponentData['attributes'][0]['cegDisplayName'];
  propValue: ComponentData['attributes'][0]['cegOption'];
  formGroupOptions?: CegFormGroupOption[];
}

export type CegFormGroup = CegFormGroupCommon &
  (CegFormGroupRadio | CegFormGroupToggle | CegFormGroupCounter | CegFormGroupCheckbox);

export interface CegFormGroupOption {
  name: string;
  defaultValue: string;
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
  value: {
    value: string;
    label: string;
  };
}>;
