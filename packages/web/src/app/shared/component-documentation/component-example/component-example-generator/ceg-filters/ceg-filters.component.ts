import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../../example-code.service';
import { CegFormGroup, CegFormGroupOption, FormState } from '../ceg.interface';
import debounce from 'lodash/debounce';
import { VisibleFieldsPipe } from './ceg-filters-visibility.pipe';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData: ComponentData;
  @Input() formGroupList: CegFormGroup[];
  @Input() desktop = true;
  @Input() topFilterFormStates = {};
  @Output() hasVisibleFilters = new EventEmitter<boolean>();
  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  codeReact: string;
  codeAngular: string;
  codeVue: string;
  codeNative: string;

  counterNumber: number;
  emptyLineRegex = /^\s*[\r\n]/gm;

  formStates: FormState = {};

  constructor(private cegService: ExampleCodeService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.codeReact = this.componentData.codeReact;
    this.codeAngular = this.componentData.codeAngular;
    this.codeNative = this.componentData.codeNativeHTML;
    this.codeVue = this.componentData.codeVue ? this.componentData.codeVue : '';
    this.codeAngularSub = this.cegService.listenCodeAngular().subscribe((code: string) => {
      this.codeAngular = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code: string) => {
      this.codeReact = code;
    });
    this.codeVueSub = this.cegService.listenCodeVue().subscribe((code: string) => {
      this.codeVue = code;
    });
    this.codeNativeSub = this.cegService.listenCodeNative().subscribe((code: string) => {
      this.codeNative = code;
    });

    this.initializeFormStates();
  }

  ngOnDestroy(): void {
    if (this.codeAngularSub) {
      this.codeAngularSub.unsubscribe();
    }
    if (this.codeReactSub) {
      this.codeReactSub.unsubscribe();
    }
    if (this.codeVue) {
      this.codeVueSub.unsubscribe();
    }
    if (this.codeNativeSub) {
      this.codeNativeSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formGroupList) {
      this.formGroupList = changes.formGroupList.currentValue;
    }
    if (changes.topFilterFormStates) {
      this.formStates = {
        ...this.formStates,
        ...changes.topFilterFormStates.currentValue,
      };
      Object.keys(changes.topFilterFormStates.currentValue).forEach((elementKey) => {
        this.removeNonVisibleProp(elementKey);
      });
    }
  }

  // Dependencies
  initializeFormStates(): void {
    this.formStates = {
      ...this.formStates,
      ...this.topFilterFormStates,
    };
    this.formGroupList.forEach((element) => {
      if (element.formType === 'checkbox') {
        element.formGroupOptions.forEach((element) => {
          this.updateFormStates(element.propName, element.defaultValue);
        });
      } else {
        this.updateFormStates(element.propName, element.defaultValue);
      }
    });
  }

  onInputValueChange(
    formField: CegFormGroup | CegFormGroupOption,
    event?: Event,
    formFieldName?: string,
  ): void {
    let value = formFieldName;
    if (!formFieldName) {
      value = (event.target as HTMLInputElement).checked.toString();
    }
    this.updateFormStates(formField.propName, value);
  }

  updateFormStates(key: string, value: string | number | boolean): void {
    this.formStates = {
      ...this.formStates,
      [key]: value.toString().toLowerCase(),
    };
    this.checkIfHasVisibleFilters();
    this.removeNonVisibleProp(key);
  }

  removeNonVisibleProp(propName: string): void {
    const dependentElements = this.getDependentElements(propName);
    if (!dependentElements || !this.codeAngular) {
      return;
    }
    dependentElements.forEach((element) => {
      const visibility = this.checkIfVisible(element);
      if (!visibility && this.codeAngular.includes(element.propName)) {
        this.removeProps(element.propName);
        this.removeSlotAndProp(element.propName, 'propSlot' in element ? element.propSlot : undefined);
        this.updateNewCode();
      }
    });
  }

  getDependentElements(propName: string): (CegFormGroup | CegFormGroupOption)[] {
    const dependentElements: (CegFormGroup | CegFormGroupOption)[] = [];
    this.formGroupList.forEach((element) => {
      if (!element.dependency) {
        return;
      }
      element.dependency.forEach((dependency) => {
        if (dependency && dependency.name === propName) {
          dependentElements.push(element);
        } else if ('formGroupOptions' in element) {
          element.formGroupOptions.forEach((element) => {
            if (element.name && element.name == propName) {
              dependentElements.push(element);
            }
          });
        }
      });
    });
    return dependentElements;
  }

  getDependencyState(formField: CegFormGroup | CegFormGroupOption): boolean {
    const visibility = formField.dependency.every((dependency) => {
      let visibility = false;
      if (typeof dependency.value === 'object') {
        visibility = dependency.value.some((element) => {
          return this.formStates[dependency.name].toString() === element.toString().toLowerCase();
        });
      } else {
        visibility =
          this.formStates[dependency.name].toString() === dependency.value.toString().toLowerCase();
      }
      return visibility;
    });
    return visibility;
  }

  checkIfHasVisibleFilters(): void {
    debounce((): void => {
      let currHasVisibleFilters = true;
      if (this.formGroupList.length === 0) {
        currHasVisibleFilters = true;
      }
      if (this.formGroupList.some((formGroup) => this.checkIfVisible(formGroup))) {
        currHasVisibleFilters = true;
      } else {
        currHasVisibleFilters = false;
      }
      this.hasVisibleFilters.emit(currHasVisibleFilters);
    }, 100)();
  }

  // CEG code-view updates
  updateNewCode(): void {
    this.cegService.updateAllCode(this.codeReact, this.codeAngular, this.codeVue, this.codeNative);
  }

  updateRadioProp(attr: string, newValue: string, type: string): void {
    if (newValue === 'none') {
      this.removeProps(attr);
    } else if (this.codeAngular.includes(attr)) {
      this.replaceOldProps(attr, newValue, type);
    } else {
      this.addNewProps(attr, newValue, type);
    }
    this.updateNewCode();
  }

  updateToggleCheckboxProp(formGroup: CegFormGroup, formGroupOption?: CegFormGroupOption): void {
    if (!(formGroup.formType === 'checkbox' || formGroup.formType === 'toggle')) {
      return;
    }
    const attr = formGroupOption ? formGroupOption.propName : formGroup.propName;
    const newValue = formGroupOption ? formGroupOption.propValue : formGroup.propValue;
    const slot = 'propSlot' in formGroup ? formGroup.propSlot : undefined;
    if (slot !== undefined) {
      if (this.codeAngular.includes(attr)) {
        this.removeSlotAndProp(attr, slot);
      } else {
        this.addSlotAndProp(attr, slot);
      }
    } else {
      if (this.codeAngular.includes(attr)) {
        this.removeProps(attr);
      } else {
        this.addNewProps(attr, newValue + '', formGroup.type);
      }
    }
    this.updateNewCode();
  }

  updateCounterProp(formGroup: CegFormGroup, stepValue: number): void {
    const attr = formGroup.propName;
    if (this.isNotAcceptedCounterValue(formGroup, stepValue)) {
      return;
    } else if (this.counterNumber === undefined) {
      this.counterNumber = +formGroup.defaultValue + stepValue;
    } else {
      this.counterNumber += stepValue;
    }

    if (this.codeAngular.includes(attr)) {
      this.replaceOldProps(attr, '' + this.counterNumber, formGroup.type);
    }
    this.updateNewCode();
  }

  private checkIfVisible(formField: CegFormGroup | CegFormGroupOption): boolean {
    const visibleFieldPipe = new VisibleFieldsPipe();
    return visibleFieldPipe.transform(formField, this.formStates);
  }

  private addNewProps(attr: string, newValue: string, type: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.addNewProp(this.codeReact, attr, newValue, 'react', type, elNameR);
    this.codeAngular = this.cegService.addNewProp(this.codeAngular, attr, newValue, 'angular', type, elNameW);
    this.codeVue = this.cegService.addNewProp(this.codeVue, attr, newValue, 'vue', type, elNameW);
    this.codeNative = this.cegService.addNewProp(this.codeNative, attr, newValue, 'native', type, elNameW);
  }

  private replaceOldProps(attr: string, newValue: string, type: string): void {
    this.codeReact = this.cegService.replaceOldProp(this.codeReact, attr, newValue, 'react', type);
    this.codeAngular = this.cegService.replaceOldProp(this.codeAngular, attr, newValue, 'angular', type);
    this.codeVue = this.cegService.replaceOldProp(this.codeVue, attr, newValue, 'vue', type);
    this.codeNative = this.cegService.replaceOldProp(this.codeNative, attr, newValue, 'native', type);
  }

  private removeProps(attr: string): void {
    this.codeReact = this.cegService.removeProp(this.codeReact, attr);
    this.codeAngular = this.cegService.removeProp(this.codeAngular, attr);
    this.codeVue = this.cegService.removeProp(this.codeVue, attr);
    this.codeNative = this.cegService.removeProp(this.codeNative, attr);
  }

  private addSlotAndProp(attr: string, value: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.addNewSlotAndProp(this.codeReact, attr, value, 'react', elNameR);
    this.codeAngular = this.cegService.addNewSlotAndProp(this.codeAngular, attr, value, 'angular', elNameW);
    this.codeVue = this.cegService.addNewSlotAndProp(this.codeVue, attr, value, 'vue', elNameW);
    this.codeNative = this.cegService.addNewSlotAndProp(this.codeNative, attr, value, 'native', elNameW);
  }

  private removeSlotAndProp(attr: string, value: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.removeSlotAndProp(this.codeReact, attr, value, 'react', elNameR);
    this.codeAngular = this.cegService.removeSlotAndProp(this.codeAngular, attr, value, 'angular', elNameW);
    this.codeVue = this.cegService.removeSlotAndProp(this.codeVue, attr, value, 'vue', elNameW);
    this.codeNative = this.cegService.removeSlotAndProp(this.codeNative, attr, value, 'native', elNameW);
  }

  private isNotAcceptedCounterValue(formGroup: CegFormGroup, stepValue: number): boolean {
    if (formGroup.formType !== 'counter') {
      return;
    }
    return (
      this.counterNumber !== undefined &&
      (this.counterNumber + stepValue > formGroup.counterMax ||
        this.counterNumber + stepValue < formGroup.counterMin)
    );
  }
}
