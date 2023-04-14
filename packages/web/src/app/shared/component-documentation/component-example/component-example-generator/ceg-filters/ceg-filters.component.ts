import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../../example-code.service';
import { CegFormGroup, CegFormGroupOption, FormState, CegSideFilterEvent, CegCodes } from '../ceg.interface';
import debounce from 'lodash.debounce';
import { VisibleFieldsPipe } from './ceg-filters-visibility.pipe';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { CegCodeUpdaterService } from 'src/app/core/services/ceg-code-updater.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit, OnDestroy, OnChanges {
  @Input() componentData: ComponentData;
  @Input() formGroupList: CegFormGroup[];
  @Input() desktop = true;
  @Input() topFilterFormStates = {};
  @Output() hasVisibleFilters = new EventEmitter<boolean>();
  @Output() propValueChange = new EventEmitter<CegSideFilterEvent>();
  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  cegCodes: CegCodes;

  counterNumber: number;
  emptyLineRegex = /^\s*[\r\n]/gm;

  formStates: FormState = {};

  constructor(
    private cegService: ExampleCodeService,
    private cegCodeUpdaterService: CegCodeUpdaterService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cegCodes = {
      react: this.componentData.codeReact,
      angular: this.componentData.codeAngular,
      native: this.componentData.codeNativeHTML,
      vue: this.componentData.codeVue ? this.componentData.codeVue : '',
    };
    this.codeAngularSub = this.cegService.listenCodeAngular().subscribe((code) => {
      this.cegCodes.angular = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code) => {
      this.cegCodes.react = code;
    });
    this.codeVueSub = this.cegService.listenCodeVue().subscribe((code) => {
      this.cegCodes.vue = code;
    });
    this.codeNativeSub = this.cegService.listenCodeNative().subscribe((code) => {
      this.cegCodes.native = code;
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
    if (this.codeVueSub) {
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
        element.formGroupOptions?.forEach((element) => {
          this.updateFormStates(element.propName!, element.defaultValue);
        });
      } else {
        this.updateFormStates(element.propName, element.defaultValue!);
      }
    });
  }

  onInputValueChange(
    formField: CegFormGroup | CegFormGroupOption,
    checkboxEvent?: Event,
    currentValue?: string | number | boolean,
  ): void {
    let value = currentValue;
    if (currentValue === undefined) {
      value = (checkboxEvent!.target as HTMLInputElement).checked.toString();
    }
    this.updateFormStates(formField.propName!, value!);
    this.propValueChange.emit({ name: formField.propName!, value: value! });
    this.restoreDefaultStateIfDependent(formField, formField.propName!);
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
    if (!dependentElements || !this.cegCodes?.angular) {
      return;
    }
    dependentElements.forEach((element) => {
      const visibility = this.checkIfVisible(element);
      if (!visibility && this.cegCodes.angular?.includes(element.propName!)) {
        this.removePropFromCode(element);
      }
    });
  }

  removePropFromCode(element: CegFormGroup | CegFormGroupOption): void {
    this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, element.propName!);
    this.cegCodes = this.cegCodeUpdaterService.removeSlotAndProp(
      this.cegCodes,
      this.componentData,
      element.propName!,
      'propSlot' in element ? element.propSlot! : (undefined as any),
    );
    this.updateNewCode();
  }

  restoreDefaultStateIfDependent(formField: CegFormGroup | CegFormGroupOption, propName: string): void {
    const dependentElements = this.getDependentElements(propName);
    if (!dependentElements) {
      return;
    }
    dependentElements.forEach((element) => {
      if (element.formType !== 'checkbox' || formField.formType !== 'checkbox') {
        return;
      }
      element.dependency?.forEach((dependency) => {
        if (dependency.value.toString() !== this.formStates[propName].toString()) {
          const checkboxToUpdate = document.getElementById(
            element.propName + '-' + this.desktop,
          ) as HTMLInputElement;
          const defaultValue = element.defaultValue === 'true' || element.defaultValue === true;
          checkboxToUpdate.checked = defaultValue;
          this.updateFormStates(element.propName!, element.defaultValue!);
          this.removePropFromCode(element);
          this.propValueChange.emit({ name: element.propName!, value: defaultValue });
        }
      });
    });
  }

  addDependentElements(
    list: (CegFormGroup | CegFormGroupOption)[],
    el: CegFormGroup | CegFormGroupOption,
    propName: string,
  ): (CegFormGroup | CegFormGroupOption)[] {
    el.dependency?.forEach((dependency) => {
      if (dependency && dependency.name === propName) {
        list.push(el);
      }
    });
    return list;
  }

  getDependentElements(propName: string): (CegFormGroup | CegFormGroupOption)[] {
    let dependentElements: (CegFormGroup | CegFormGroupOption)[] = [];
    this.formGroupList.forEach((element) => {
      if (!element.dependency && 'formGroupOptions' in element) {
        element.formGroupOptions?.forEach((el) => {
          if (el.dependency) {
            dependentElements = this.addDependentElements(dependentElements, el, propName);
          }
        });
      } else {
        dependentElements = this.addDependentElements(dependentElements, element, propName);
      }
    });
    return dependentElements;
  }

  getDependencyState(formField: CegFormGroup | CegFormGroupOption): boolean {
    const visibility = formField.dependency?.every((dependency) => {
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
    return !!visibility;
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
    this.cegService.updateAllCode(
      this.cegCodes.react!,
      this.cegCodes.angular!,
      this.cegCodes.vue!,
      this.cegCodes.native!,
    );
  }

  updateRadioProp(attr: string, newValue: string, type: string): void {
    if (newValue === 'none') {
      this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, attr);
    } else if (this.cegCodes.angular?.includes(attr)) {
      this.cegCodes = this.cegCodeUpdaterService.replaceOldProps(this.cegCodes, attr, newValue, type);
    } else {
      this.cegCodes = this.cegCodeUpdaterService.addNewProps(
        this.cegCodes,
        this.componentData,
        attr,
        newValue,
        type,
      );
    }
    this.updateNewCode();
  }

  updateToggleCheckboxProp(formGroup: CegFormGroup, formGroupOption?: CegFormGroupOption): void {
    if (!(formGroup.formType === 'checkbox' || formGroup.formType === 'toggle')) {
      return;
    }
    const attr = formGroupOption ? formGroupOption.propName! : formGroup.propName;
    const newValue = formGroupOption ? formGroupOption.propValue! : formGroup.propValue!;
    const slot = 'propSlot' in formGroup ? formGroup.propSlot : undefined;
    if (slot !== undefined) {
      if (this.cegCodes.angular?.includes(attr)) {
        this.cegCodes = this.cegCodeUpdaterService.removeSlotAndProp(
          this.cegCodes,
          this.componentData,
          attr,
          slot,
        );
      } else {
        this.cegCodes = this.cegCodeUpdaterService.addSlotAndProp(
          this.cegCodes,
          this.componentData,
          attr,
          slot,
        );
      }
    } else {
      if (this.cegCodes.angular?.includes(attr)) {
        this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, attr);
      } else {
        this.cegCodes = this.cegCodeUpdaterService.addNewProps(
          this.cegCodes,
          this.componentData,
          attr,
          newValue.toString(),
          formGroup.type!,
        );
      }
    }
    this.updateNewCode();
  }

  updateCounterProp(oldValue: number, formGroup: CegFormGroup, stepValue: number): void {
    const attr = formGroup.propName;
    if (this.isNotAcceptedCounterValue(oldValue, formGroup, stepValue)) {
      return;
    } else {
      this.counterNumber = oldValue + stepValue;
    }
    if (this.cegCodes.angular?.includes(attr)) {
      this.cegCodes = this.cegCodeUpdaterService.replaceOldProps(
        this.cegCodes,
        attr,
        this.counterNumber.toString(),
        formGroup.type!,
      );
    } else {
      this.cegCodes = this.cegCodeUpdaterService.addNewProps(
        this.cegCodes,
        this.componentData,
        attr,
        this.counterNumber.toString(),
        formGroup.type!,
      );
    }
    this.updateNewCode();
  }

  private checkIfVisible(formField: CegFormGroup | CegFormGroupOption): boolean {
    const visibleFieldPipe = new VisibleFieldsPipe();
    return visibleFieldPipe.transform(formField, this.formStates, false);
  }

  private isNotAcceptedCounterValue(newValue: number, formGroup: CegFormGroup, stepValue: number): boolean {
    if (formGroup.formType !== 'counter') {
      return undefined as any;
    }
    return (
      newValue !== undefined &&
      (newValue + stepValue > formGroup.counterMax! || newValue + stepValue < formGroup.counterMin!)
    );
  }
}
