import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../../example-code.service';

@Component({
  selector: 'app-ceg-filters',
  templateUrl: './ceg-filters.component.html',
  styleUrls: ['./ceg-filters.component.scss'],
})
export class CegFiltersComponent implements OnInit {
  @Input() componentData;
  @Input() props;
  @Input() selectedType;
  @Input() desktop = true;
  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  counterNumber: number;
  codeReact;
  codeAngular;
  codeVue;
  codeNative;
  checkboxesLength = 0;
  checkboxes = [];
  checkboxGroups = [];
  hasCheckboxes = false;
  emptyLineRegex = /^\s*[\r\n]/gm;
  objectKeys = Object.keys;

  constructor(private cegService: ExampleCodeService) {}

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
    this.initializeComponentProps();
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
    if (changes.selectedType) {
      this.selectedType = changes.selectedType.currentValue;
    }
    if (changes.props) {
      this.props = changes.props.currentValue;
    }
  }

  initializeComponentProps(): void {
    if (!this.componentData.attributes) {
      return;
    }
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      Object.keys(this.componentData.attributes[attribute]).forEach((value) => {
        if (value === 'cegFormType' && this.componentData.attributes[attribute].cegFormType === 'checkbox') {
          const newObject = {
            attribute,
            ...this.componentData.attributes[attribute],
          };
          this.hasCheckboxes = true;
          this.checkboxes.push(newObject);
        }
      });
    });
    if (this.hasCheckboxes) {
      this.checkboxGroups = this.sortCheckboxArrays(this.checkboxes);
      this.checkboxesLength = Object.keys(this.checkboxGroups).length;
    }
  }

  sortCheckboxArrays(checkboxGroups: any[]): [] {
    const checkboxArrays = checkboxGroups.reduce((obj, value) => {
      const key = `${value.cegDisplayGroup}`;
      if (obj[key] == null) {
        obj[key] = [];
      }
      obj[key].push(value);
      return obj;
    }, {});
    return checkboxArrays;
  }

  typeDependencyExistsToggle(prop: Record<string, any>): boolean {
    if (!prop.cegTypeDependency || !this.selectedType) {
      return;
    }
    if (typeof prop.cegTypeDependency === 'string') {
      return prop.cegTypeDependency.toLowerCase() === this.selectedType.toLowerCase();
    } else {
      return prop.cegTypeDependency.find((element) => {
        return element.toLowerCase() === this.selectedType.toLowerCase();
      });
    }
  }

  typeDependencyExists(prop: Record<string, any>): boolean {
    const dependencyCheckbox = <HTMLInputElement>(
      document.getElementById(prop.cegTypeDependency + '-checkbox-' + this.desktop)
    );
    const checkboxThatHasDependency = <HTMLInputElement>(
      document.getElementById(prop.attribute + '-checkbox-' + this.desktop)
    );
    if (!checkboxThatHasDependency) {
      return;
    }
    if (
      (prop.cegTypeDependencyValue === 'false' &&
        checkboxThatHasDependency.checked &&
        dependencyCheckbox.checked) ||
      (prop.cegTypeDependencyValue === 'true' &&
        checkboxThatHasDependency.checked &&
        !dependencyCheckbox.checked) ||
      (!prop.cegTypeDependencyValue && checkboxThatHasDependency.checked && !dependencyCheckbox.checked)
    ) {
      checkboxThatHasDependency.checked = false;
      this.updateToggleCheckboxProp(prop, 'false');
    }
    return (
      (prop.cegTypeDependencyValue === 'false' && !dependencyCheckbox.checked) ||
      (prop.cegTypeDependencyValue === 'true' && dependencyCheckbox.checked) ||
      (!prop.cegTypeDependencyValue && dependencyCheckbox.checked)
    );
  }

  updateNewCode(): void {
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeAngular(this.codeAngular);
    this.cegService.updateCodeVue(this.codeVue);
    this.cegService.updateCodeNative(this.codeNative);
  }

  addNewProps(attr: string, newValue: string, type: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.addNewProp(this.codeReact, attr, newValue, 'react', type, elNameR);
    this.codeAngular = this.cegService.addNewProp(this.codeAngular, attr, newValue, 'angular', type, elNameW);
    this.codeVue = this.cegService.addNewProp(this.codeVue, attr, newValue, 'vue', type, elNameW);
    this.codeNative = this.cegService.addNewProp(this.codeNative, attr, newValue, 'native', type, elNameW);
  }

  replaceOldProps(attr: string, newValue: string, type: string): void {
    this.codeReact = this.cegService.replaceOldProp(this.codeReact, attr, newValue, 'react', type);
    this.codeAngular = this.cegService.replaceOldProp(this.codeAngular, attr, newValue, 'angular', type);
    this.codeVue = this.cegService.replaceOldProp(this.codeVue, attr, newValue, 'vue', type);
    this.codeNative = this.cegService.replaceOldProp(this.codeNative, attr, newValue, 'native', type);
  }

  removeProps(attr: string): void {
    this.codeReact = this.cegService.removeProp(this.codeReact, attr);
    this.codeAngular = this.cegService.removeProp(this.codeAngular, attr);
    this.codeVue = this.cegService.removeProp(this.codeVue, attr);
    this.codeNative = this.cegService.removeProp(this.codeNative, attr);
  }

  updateRadioProp(prop: Record<string, any>, newValue: string): void {
    const attr = prop.attribute;
    const type = prop.cegType;
    if (this.codeAngular.includes(prop.attribute)) {
      this.replaceOldProps(attr, newValue, type);
    } else {
      this.addNewProps(attr, newValue, type);
    }
    this.updateNewCode();
  }

  addSlotAndProp(attr: string, newValue: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    this.codeReact = this.cegService.addNewSlotAndProp(this.codeReact, attr, newValue, 'react', elNameR);
    this.codeAngular = this.cegService.addNewSlotAndProp(
      this.codeAngular,
      attr,
      newValue,
      'angular',
      elNameW,
    );
    this.codeVue = this.cegService.addNewSlotAndProp(this.codeVue, attr, newValue, 'vue', elNameW);
    this.codeNative = this.cegService.addNewSlotAndProp(this.codeNative, attr, newValue, 'native', elNameW);
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
    this.codeVue = this.cegService.removeSlotAndProp(this.codeVue, attr, oldValue, 'vue', elNameW);
    this.codeNative = this.cegService.removeSlotAndProp(this.codeNative, attr, oldValue, 'native', elNameW);
  }

  updateToggleCheckboxProp(prop: Record<string, any>, newValue: string): void {
    const attr = prop.attribute;
    const type = prop.cegType;
    if (prop.cegContent) {
      if (this.codeAngular.includes(attr)) {
        this.removeSlotAndProp(attr, prop.cegContent);
      } else {
        this.addSlotAndProp(attr, prop.cegContent);
      }
    } else {
      if (this.codeAngular.includes(attr)) {
        this.removeProps(attr);
      } else {
        this.addNewProps(attr, newValue, type);
      }
    }
    this.updateNewCode();
  }

  isAcceptedCounterValue(prop: Record<string, any>, newValue: number): boolean {
    return (
      this.counterNumber !== undefined &&
      (this.counterNumber + newValue > prop.cegCounterMax ||
        this.counterNumber + newValue < prop.cegCounterMin)
    );
  }

  updateCounterProp(prop: Record<string, any>, newValue: number): void {
    const attr = prop.attribute;
    const type = prop.cegType;
    if (this.isAcceptedCounterValue(prop, newValue)) {
      return;
    } else if (this.counterNumber === undefined) {
      this.counterNumber = prop.cegDefault + newValue;
    } else {
      this.counterNumber += newValue;
    }

    if (this.codeAngular.includes(attr)) {
      // Replaces old value for prop
      this.replaceOldProps(attr, '' + this.counterNumber, type);
    }
    this.updateNewCode();
  }
}
