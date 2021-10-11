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
  codeNativeSub: Subscription;
  counterNumber: number;
  codeReact;
  codeAngular;
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
    this.codeAngularSub = this.cegService.listenCodeAngular().subscribe((code: string) => {
      this.codeAngular = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code: string) => {
      this.codeReact = code;
    });
    this.codeNativeSub = this.cegService.listenCodeNative().subscribe((code: string) => {
      this.codeNative = code;
    });
    this.initializeComponentProps();
  }

  ngOnDestroy(): void {
    this.codeAngularSub.unsubscribe();
    this.codeReactSub.unsubscribe();
    this.codeNativeSub.unsubscribe();
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

  updateToggleCheckboxProp(prop: Record<string, any>, newValue: string): void {
    const attr = prop.attribute;
    const type = prop.cegType;
    if (this.codeAngular.includes(prop.attribute)) {
      this.removeProps(attr);
    } else {
      this.addNewProps(attr, newValue, type);
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
