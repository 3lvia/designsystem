import { AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../example-code.service';
import * as ElvisIcons from '@elvia/elvis-assets-icons';
import ComponentData, { AttributeType } from 'src/app/doc-pages/components/component-data.interface';
import ComponentTypeData from 'src/app/doc-pages/components/component-type-data.interface';

type DropdownEvent = CustomEvent<{
  value: {
    value: string;
    label: string;
  };
}>;

@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('cegFrame') cegFrame;
  @ViewChild('cegContent') cegContent;
  @Input() delayInnerHtml = false;
  @Input() componentData: ComponentData;
  @Input() typesData: ComponentTypeData[];
  @Input() typePropExists = false;
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
  codeReact: ComponentData['codeReact'];
  codeAngular: ComponentData['codeAngular'];
  codeVue: ComponentData['codeVue'];
  codeNative: ComponentData['codeNativeHTML'];
  dynamicCode: SafeHtml;

  enableFilters = true;
  hasSideFilters = true;
  formGroupList = [];
  allCheckboxes: (AttributeType & { propName: string })[] = [];

  iconsOptions: { value: string; label: string }[] = [];
  selectedIcon: { value: string; label: string };
  defaultIcon: { value: string; label: string };

  typeOptions: { value: string | number; label: string }[] = [];
  selectedType: string;
  defaultType;
  bgOptions: { value: number; label: string }[] = [];
  bgObj: AttributeType & { propName: string };
  selectedBg: string;
  defaultBg: string;

  topFilterFormStates: { [key: string]: string } = {};

  constructor(private cegService: ExampleCodeService, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.codeAngular = this.componentData.codeAngular ? this.componentData.codeAngular : '';
    this.codeReact = this.componentData.codeReact ? this.componentData.codeReact : '';
    this.codeVue = this.componentData.codeVue ? this.componentData.codeVue : '';
    this.codeNative = this.componentData.codeNativeHTML ? this.componentData.codeNativeHTML : '';
    if (this.inlineExample) {
      return;
    }
    this.codeAngularSub = this.cegService.listenCodeAngular().subscribe((code) => {
      this.codeAngular = code;
    });
    this.codeReactSub = this.cegService.listenCodeReact().subscribe((code) => {
      this.codeReact = code;
    });
    this.codeVueSub = this.cegService.listenCodeVue().subscribe((code) => {
      this.codeVue = code;
    });
    this.codeNativeSub = this.cegService.listenCodeNative().subscribe((code) => {
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
    let index = 0;
    let checkboxIndex = undefined;
    const filteringAttributeKeys = Object.keys(this.componentData.attributes).filter((propKey) => {
      return (
        props[propKey].cegFormType &&
        props[propKey].cegFormType !== 'type' &&
        props[propKey].cegFormType !== 'background'
      );
    });
    filteringAttributeKeys.forEach((propKey) => {
      const prop = props[propKey];
      if (!prop.cegFormType) {
        return;
      }
      const formType = prop.cegFormType;
      if (formType === 'radio') {
        const formGroupOptions = [];
        let formOption;
        prop.cegOptions.forEach((option) => {
          formOption = {
            name: option,
            defaultValue: prop.cegDefault === option,
          };
          formGroupOptions.splice(index, 0, formOption);
        });
        const formGroupObject = {
          label: prop.cegDisplayName,
          formType: formType,
          type: prop.cegType,
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
        if (checkboxIndex === undefined) {
          checkboxIndex = index;
        }
      } else if (formType === 'toggle') {
        const formGroupObject = {
          label: prop.cegDisplayName,
          formType: formType,
          type: prop.cegType,
          defaultValue: prop.cegDefault,
          propValue: prop.cegOption,
          propName: propKey,
          propSlot: prop.cegSlot,
          dependency: prop.cegDependency,
          displayGroup: prop.cegDisplayGroup,
        };
        this.formGroupList.push(formGroupObject);
      } else if (formType === 'counter') {
        const formGroupObject = {
          label: prop.cegDisplayName,
          formType: formType,
          type: prop.cegType,
          defaultValue: prop.cegDefault,
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
      index++;
    });
    this.initializeCheckboxFormGroups(checkboxIndex);
  }

  initializeCheckboxFormGroups(checkboxIndex: number): void {
    const checkboxGroups = this.sortCheckboxesByGroup(this.allCheckboxes);
    const checkboxList = [];
    Object.keys(checkboxGroups).forEach((checkboxGroupKey) => {
      const formGroupOptions = [];
      checkboxGroups[checkboxGroupKey].forEach((checkbox) => {
        const formOption = {
          name: checkbox.cegDisplayName,
          defaultValue: checkbox.cegDefault ? checkbox.cegDefault : false,
          propName: checkbox.propName,
          propValue: checkbox.cegOption,
          dependency: checkbox.cegDependency,
          type: checkbox.cegType,
          formType: 'checkbox',
        };
        formGroupOptions.push(formOption);
      });
      const checkboxFormGroupObject = {
        label: checkboxGroupKey,
        formType: 'checkbox',
        formGroupOptions,
      };
      checkboxList.push(checkboxFormGroupObject);
    });
    this.formGroupList.splice(checkboxIndex, 0, ...checkboxList);
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
        this.addToFormStates(propKey, prop.cegOptions[prop.cegDefault as number]);
      } else if (formType === 'iconName') {
        this.selectedIcon = this.iconsOptions[0];
        this.defaultIcon = { value: 'addCircle', label: 'Add Circle' };
        for (const icon in ElvisIcons) {
          const labelName = icon.replace(/([A-Z])/g, ' $1');
          const finalLabel = labelName.charAt(0).toUpperCase() + labelName.slice(1);
          this.iconsOptions.push({ value: icon, label: finalLabel });
        }
        this.addToFormStates(propKey, this.iconsOptions[0].value);
      } else if (formType === 'background') {
        this.bgObj = {
          propName: propKey,
          ...prop,
        };
        this.selectedBg = prop.cegDefault as string;
        this.defaultBg = prop.cegDefault as string;
        this.bgObj.cegOptions.forEach((option, index) => {
          const type = { value: index, label: option };
          this.bgOptions.push(type);
        });
        this.addToFormStates(propKey, prop.cegOptions[prop.cegDefault as number]);
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

  updateFormStates(propName: string, event: DropdownEvent): void {
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
  updateExampleCode(): void {
    this.cegService.updateCodeReact(this.codeReact);
    this.cegService.updateCodeAngular(this.codeAngular);
    this.cegService.updateCodeVue(this.codeVue);
    this.cegService.updateCodeNative(this.codeNative);
  }

  updateSelectedType(event: DropdownEvent, icon?: boolean): void {
    const label = event.detail.value.label;
    const value = event.detail.value.value;
    this.selectedType = label;
    let newValue: string;
    if (!icon || icon === undefined) {
      newValue = label.toLowerCase();
      this.updateSelected('type', newValue, 'string');
    } else {
      this.updateSelected('name', value, 'string');
    }
  }

  updateSelectedTypeCustom(event: DropdownEvent): void {
    const label = event.detail.value.label;
    this.typesData.forEach((element) => {
      if (element.type === label.toLowerCase()) {
        this.selectedType = label;
        this.codeReact = element.codeReact;
        this.codeAngular = element.codeAngular;
        this.codeVue = element.codeVue ? element.codeVue : '';
        this.codeNative = element.codeNativeHTML;
      }
    });
    if (this.typePropExists) {
      this.updateSelected('type', label.toLowerCase(), 'string', false);
    }
    this.enableFilters = false;
    setTimeout(() => {
      this.enableFilters = true;
      setTimeout(() => {
        this.updateExampleCode();
      }, 100);
    }, 100);
  }

  updateSelectedBg(event: DropdownEvent): void {
    const label = event.detail.value.label;
    this.selectedBg = label;
    if (this.bgObj.cegOptions[this.bgObj.cegDefault as string] === label) {
      this.updateSelected(this.bgObj.propName, this.bgObj.default as string, 'boolean');
    } else {
      this.updateSelected(this.bgObj.propName, '' + (this.bgObj.default == 'false'), 'boolean');
    }
  }

  updateSelected(attr: string, newValue: string, cegType: string, updateExampleCode?: boolean): void {
    const updateCode = updateExampleCode ? updateExampleCode : true;
    const elNameR = this.componentData.elementNameR;
    const elNameW = this.componentData.elementNameW;
    if (this.codeAngular.includes(attr)) {
      this.codeReact = this.cegService.replaceOldProp(this.codeReact, attr, newValue, 'react', cegType);
      this.codeAngular = this.cegService.replaceOldProp(this.codeAngular, attr, newValue, 'angular', cegType);
      this.codeVue = this.cegService.replaceOldProp(this.codeVue, attr, newValue, 'vue', cegType);
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
    if (updateCode) {
      this.updateExampleCode();
    }
  }
}
