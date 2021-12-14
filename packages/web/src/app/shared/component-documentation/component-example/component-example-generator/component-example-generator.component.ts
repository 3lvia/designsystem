import { AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../example-code.service';
import * as ElvisIcons from '@elvia/elvis-assets-icons';

@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('cegFrame') cegFrame;
  @ViewChild('cegContent') cegContent;
  @Input() delayInnerHtml = false;
  @Input() componentData;
  @Input() typesData;
  @Input() width = 100;
  @Input() hasPreview = true;
  @Input() inlineExample = false;
  @Input() accordionCustom = false;
  @Input() overflowY;
  @Input() overflowX;
  @Input() alignedTop = false;
  @Input() height = '340';

  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  codeReact;
  codeAngular;
  codeVue;
  codeNative;
  dynamicCode;

  enableFilters = true;
  hasSideFilters = true;
  formGroupList = [];
  allCheckboxes = [];

  isIconDropdown = false;
  iconsOptions = [];
  selectedIcon;
  defaultIcon;

  typeOptions = [];
  selectedType;
  defaultType;
  bgOptions = [];
  bgObj;
  selectedBg;
  defaultBg;

  topFilterFormStates = {};

  constructor(private cegService: ExampleCodeService, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.codeAngular = this.componentData.codeAngular ? this.componentData.codeAngular : '';
    this.codeReact = this.componentData.codeReact ? this.componentData.codeReact : '';
    this.codeVue = this.componentData.codeVue ? this.componentData.codeVue : '';
    this.codeNative = this.componentData.codeNativeHTML ? this.componentData.codeNativeHTML : '';
    if (this.inlineExample) {
      return;
    }
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
      this.updateCegFrame(code);
    });

    this.initializeSideFilterFormGroups();
    this.initializeTopFilters();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      if (!this.hasPreview) {
        return;
      }
      this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML);
      if (this.componentData.codeNativeScript) {
        setTimeout(() => eval(this.componentData.codeNativeScript), 200);
      }
    }, 200);
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

  initializeSideFilterFormGroups(): void {
    const props = this.componentData.attributes;
    Object.keys(props).forEach((propKey) => {
      const prop = props[propKey];
      const formType = prop.cegFormType;
      if (formType === 'radio') {
        const formGroupOptions = [];
        let formOption;
        prop.cegOptions.forEach((option) => {
          formOption = {
            name: option,
            defaultValue: prop.cegDefault === option,
          };
          formGroupOptions.push(formOption);
        });
        const formGroupObject = {
          label: prop.cegDisplayName,
          type: formType,
          formGroupOptions,
          propName: propKey,
          dependency: prop.cegDependency,
          defaultValue: prop.cegDefault,
        };
        this.formGroupList.push(formGroupObject);
      } else if (formType === 'checkbox') {
        const checkboxObject = {
          propName: propKey,
          ...prop,
        };
        this.allCheckboxes.push(checkboxObject);
      } else if (formType === 'toggle') {
        const formGroupObject = {
          label: prop.cegDisplayName,
          type: formType,
          defaultValue: prop.cegDefault,
          propValue: prop.cegOption,
          propName: propKey,
          propSlot: prop.cegSlot,
          dependency: prop.cegDependency,
        };
        this.formGroupList.push(formGroupObject);
      } else if (formType === 'counter') {
        const formGroupObject = {
          label: prop.cegDisplayName,
          type: formType,
          defaultValue: prop.cegDefault,
          propValue: prop.cegPropValue,
          propName: propKey,
          propSlot: prop.cegSlot,
          counterMax: prop.cegCounterMax,
          counterMin: prop.cegCounterMin,
          counterStepValue: prop.cegStepValue,
          counterType: prop.cegCounterType,
          dependency: prop.cegDependency,
        };
        this.formGroupList.push(formGroupObject);
      }
    });
    this.initializeCheckboxFormGroups();
  }

  initializeCheckboxFormGroups(): void {
    const checkboxGroups = this.sortCheckboxesByGroup(this.allCheckboxes);
    Object.keys(checkboxGroups).forEach((checkboxGroupKey) => {
      const formGroupOptions = [];
      checkboxGroups[checkboxGroupKey].forEach((checkbox) => {
        const formOption = {
          name: checkbox.cegDisplayName,
          defaultValue: false,
          propName: checkbox.propName,
          propValue: checkbox.cegOption,
          dependency: checkbox.cegDependency,
          type: 'checkbox',
        };
        formGroupOptions.push(formOption);
      });
      const checkboxFormGroupObject = {
        label: checkboxGroupKey,
        type: 'checkbox',
        formGroupOptions,
      };
      this.formGroupList.push(checkboxFormGroupObject);
    });
  }

  initializeTopFilters(): void {
    const props = this.componentData.attributes;
    Object.keys(props).forEach((propKey) => {
      const prop = props[propKey];
      const formType = prop.cegFormType;
      if (formType === 'type') {
        this.selectedType = prop.cegOptions[0];
        this.defaultType = prop.cegDefault;
        prop.cegOptions.forEach((option, index) => {
          const label = option.charAt(0).toUpperCase() + option.slice(1);
          const newType = { value: index, label: label };
          this.typeOptions.push(newType);
        });
        this.addToFormStates(propKey, prop.cegOptions[prop.cegDefault]);
      } else if (formType === 'iconName') {
        this.isIconDropdown = true;
        this.selectedIcon = this.iconsOptions[0];
        this.defaultIcon = { value: 'addCircle', label: 'addCircle' };
        for (const icon in ElvisIcons) {
          this.iconsOptions.push({ value: icon, label: icon });
        }
        this.addToFormStates(propKey, this.iconsOptions[0].value);
      } else if (formType === 'background') {
        this.bgObj = {
          propName: propKey,
          ...prop,
        };
        this.selectedBg = prop.cegDefault;
        this.defaultBg = prop.cegDefault;
        this.bgObj.cegOptions.forEach((option, index) => {
          const type = { value: index, label: option };
          this.bgOptions.push(type);
        });
        this.addToFormStates(propKey, prop.cegOptions[prop.cegDefault]);
      }
    });

    if (this.typesData) {
      this.typesData.forEach((option, index) => {
        const label = option.type.charAt(0).toUpperCase() + option.type.slice(1);
        const newType = { value: index, label: label };
        this.typeOptions.push(newType);
      });
    }
  }

  sortCheckboxesByGroup(checkboxGroups: any[]): [] {
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

  updateFormStates(propName: string, event: CustomEvent): void {
    const value = event.detail.value.label;
    this.addToFormStates(propName, value);
  }

  addToFormStates(key: string, value: string | number | boolean): void {
    this.topFilterFormStates = {
      ...this.topFilterFormStates,
      [key]: value.toString().toLowerCase(),
    };
  }

  updateCegFrame(code: string): void {
    this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(code);
    if (this.componentData.codeNativeScript) {
      setTimeout(() => eval(this.componentData.codeNativeScript), 200);
    }
  }

  // CEG code-view updates
  updateProps(): void {
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeAngular(this.codeAngular);
    this.cegService.updateCodeVue(this.codeVue);
    this.cegService.updateCodeNative(this.codeNative);
  }

  updateSelectedType(selected: { value: any; label: any }, icon?: boolean): void {
    this.selectedType = selected.label;
    let newValue;
    if (!icon || icon === undefined) {
      newValue = selected.label.toLowerCase();
      this.updateSelected('type', newValue, 'type');
    } else {
      newValue = selected.label;
      this.updateSelected('name', newValue, 'name');
    }
  }

  updateSelectedTypeCustom(selected: { value: any; label: any }): void {
    this.typesData.forEach((element) => {
      if (element.type === selected.label.toLowerCase()) {
        this.selectedType = selected.label;
        this.codeReact = element.codeReact;
        this.codeAngular = element.codeAngular;
        this.codeVue = element.codeVue ? element.codeVue : '';
        this.codeNative = element.codeNativeHTML;
      }
    });
    this.enableFilters = false;
    setTimeout(() => {
      this.enableFilters = true;
      setTimeout(() => {
        this.updateProps();
      }, 100);
    }, 100);
  }

  updateSelectedBg(selected: { value: any; label: any }): void {
    this.selectedBg = selected.label;
    if (this.bgObj.cegOptions[this.bgObj.cegDefault] === selected.label) {
      this.updateSelected(this.bgObj.propName, this.bgObj.default, 'boolean');
    } else {
      this.updateSelected(this.bgObj.propName, '' + (this.bgObj.default == 'false'), 'boolean');
    }
  }

  updateSelected(attr: string, newValue: string, cegType: string): void {
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    if (this.codeAngular.includes(attr)) {
      this.codeReact = this.cegService.replaceOldProp(this.codeReact, attr, newValue, 'react', cegType);
      this.codeAngular = this.cegService.replaceOldProp(this.codeAngular, attr, newValue, 'angular', cegType);
      this.codeNative = this.cegService.replaceOldProp(this.codeNative, attr, newValue, 'native', cegType);
    } else {
      this.codeReact = this.cegService.addNewProp(this.codeReact, attr, newValue, 'react', cegType, elNameR);
      this.codeAngular = this.cegService.addNewProp(
        this.codeAngular,
        attr,
        newValue,
        'angular',
        cegType,
        elNameW,
      );
      this.codeVue = this.cegService.addNewProp(this.codeVue, attr, newValue, 'vue', cegType, elNameW);
      this.codeNative = this.cegService.addNewProp(
        this.codeNative,
        attr,
        newValue,
        'native',
        cegType,
        elNameW,
      );
    }
    this.updateProps();
  }
}
