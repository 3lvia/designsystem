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
import { CegFormGroup, CegFormGroupOption } from '../ceg.interface';
import { debounce } from 'lodash';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  @Input() formGroupList;
  @Input() desktop = true;
  @Input() topFilterFormStates = {};
  @Output() hasVisibleFilters = new EventEmitter();
  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeNativeSub: Subscription;
  codeReact;
  codeAngular;
  codeNative;

  counterNumber: number;
  emptyLineRegex = /^\s*[\r\n]/gm;

  formStates = {};

  constructor(private cegService: ExampleCodeService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.codeReact = this.componentData.codeReact;
    this.codeAngular = this.componentData.codeAngular;
    this.codeNative = this.componentData.codeNativeHTML;
    this.codeAngularSub = this.cegService.listenCodeAngular().subscribe((code: string) => {
      this.codeAngular = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code: string) => {
      this.codeReact = code;
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
    }
  }

  // Dependencies
  initializeFormStates(): void {
    this.formStates = {
      ...this.formStates,
      ...this.topFilterFormStates,
    };
    this.formGroupList.forEach((element) => {
      if (element.type === 'checkbox') {
        element.formGroupOptions.forEach((element) => {
          this.updateFormStates(element.propName, element.defaultValue);
        });
      } else {
        this.updateFormStates(element.propName, element.defaultValue);
      }
    });
  }

  onInputValueChange(key: string, event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.updateFormStates(key, value);
  }

  updateFormStates(key: string, value: string | number | boolean): void {
    this.formStates = {
      ...this.formStates,
      [key]: value.toString().toLowerCase(),
    };
    this.checkIfHasVisibleFilters();
  }

  checkIfVisible(formGroup: CegFormGroup): boolean {
    let visibility = false;
    if (!formGroup.dependency) {
      visibility = true;
      return;
    }
    if (typeof formGroup.dependency.value === 'object') {
      visibility = formGroup.dependency.value.some((element) => {
        return this.formStates[formGroup.dependency.name] === (element === 'true' || element.toLowerCase());
      });
    } else {
      visibility =
        this.formStates[formGroup.dependency.name].toString() ===
        (formGroup.dependency.value.toString() || formGroup.dependency.value.toLowerCase());
    }
    if (!visibility && this.codeAngular.includes(formGroup.propName)) {
      this.removeProps(formGroup.propName);
      this.updateNewCode();
    }
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
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeAngular(this.codeAngular);
    this.cegService.updateCodeNative(this.codeNative);
  }

  addNewProps(attr: string, newValue: string, type: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.addNewProp(this.codeReact, attr, newValue, 'react', type, elNameR);
    this.codeAngular = this.cegService.addNewProp(this.codeAngular, attr, newValue, 'angular', type, elNameW);
    this.codeNative = this.cegService.addNewProp(this.codeNative, attr, newValue, 'native', type, elNameW);
  }

  replaceOldProps(attr: string, newValue: string, type: string): void {
    this.codeReact = this.cegService.replaceOldProp(this.codeReact, attr, newValue, 'react', type);
    this.codeAngular = this.cegService.replaceOldProp(this.codeAngular, attr, newValue, 'angular', type);
    this.codeNative = this.cegService.replaceOldProp(this.codeNative, attr, newValue, 'native', type);
  }

  removeProps(attr: string): void {
    this.codeReact = this.cegService.removeProp(this.codeReact, attr);
    this.codeAngular = this.cegService.removeProp(this.codeAngular, attr);
    this.codeNative = this.cegService.removeProp(this.codeNative, attr);
  }

  addSlotAndProp(attr: string, value: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.addNewSlotAndProp(this.codeReact, attr, value, 'react', elNameR);
    this.codeAngular = this.cegService.addNewSlotAndProp(this.codeAngular, attr, value, 'angular', elNameW);
    this.codeNative = this.cegService.addNewSlotAndProp(this.codeNative, attr, value, 'native', elNameW);
  }

  removeSlotAndProp(attr: string, oldValue: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.removeSlotAndProp(this.codeReact, attr, oldValue, 'react', elNameR);
    this.codeAngular = this.cegService.removeSlotAndProp(
      this.codeAngular,
      attr,
      oldValue,
      'angular',
      elNameW,
    );
    this.codeNative = this.cegService.removeSlotAndProp(this.codeNative, attr, oldValue, 'native', elNameW);
  }

  updateRadioProp(attr: string, newValue: string, type: string): void {
    if (this.codeAngular.includes(attr)) {
      this.replaceOldProps(attr, newValue, type);
    } else {
      this.addNewProps(attr, newValue, type);
    }
    this.updateNewCode();
  }

  updateToggleCheckboxProp(formGroup: CegFormGroup, formGroupOption?: CegFormGroupOption): void {
    const attr = formGroupOption ? formGroupOption.propName : formGroup.propName;
    const newValue = formGroupOption ? formGroupOption.propValue : formGroup.propValue;
    const slot = formGroup.propSlot;
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

  isNotAcceptedCounterValue(formGroup: CegFormGroup, stepValue: number): boolean {
    return (
      this.counterNumber !== undefined &&
      (this.counterNumber + stepValue > formGroup.counterMax ||
        this.counterNumber + stepValue < formGroup.counterMin)
    );
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
}
