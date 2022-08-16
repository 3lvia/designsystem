import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ExampleCodeService } from '../../example-code.service';
import * as ElvisIcons from '@elvia/elvis-assets-icons';
import ComponentData, { AttributeType } from 'src/app/doc-pages/components/component-data.interface';
import ComponentTypeData from 'src/app/doc-pages/components/component-type-data.interface';
import {
  CegFormGroup,
  DropdownEvent,
  CegSideFilterEvent,
  CegFormGroupOption,
  CegCodes,
} from './ceg.interface';
import { KeyValue } from '@angular/common';
import { CegCodeUpdaterService } from 'src/app/core/services/ceg-code-updater.service';

interface DropdownOption {
  value: string | number;
  label: string;
}
interface DropdownIconOption extends DropdownOption {
  value: string;
  icon: string;
}

@Component({
  selector: 'app-component-example-generator',
  templateUrl: './component-example-generator.component.html',
  styleUrls: ['./component-example-generator.component.scss'],
})
export class ComponentExampleGeneratorComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('cegContent') cegContent: ElementRef<HTMLDivElement>;
  @Input() delayInnerHtml = false;
  @Input() componentData: ComponentData;
  @Input() typesData: ComponentTypeData[];
  @Input() typePropExists = false;
  @Input() width = 100;
  @Input() hasPreview = true;
  @Input() inlineExample = false;
  @Input() accordionCustom = false;
  @Input() overflowY: string;
  @Input() overflowX: string;
  @Input() alignedTop = false;
  @Input() height = '340';

  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  cegCodes: CegCodes;
  dynamicCode: SafeHtml;

  customTextProps: {
    [prop: string]: {
      value: AttributeType['cegDefault'];
      type: AttributeType['cegCustomTextType'];
      active: boolean;
    };
  } = {};
  hasCustomTextProps = false;
  showCustomTextPopover = false;
  customTextPopoverIsOpen = false;

  mobileSideFilterPopoverIsOpen = false;
  enableFilters = true;
  hasSideFilters = true;
  formGroupList: CegFormGroup[] = [];
  allCheckboxes: (AttributeType & { propName: string })[] = [];

  iconsOptions: DropdownIconOption[] = [];
  selectedIcon: DropdownIconOption;
  defaultIcon: DropdownIconOption;

  typeOptions: DropdownOption[] = [];
  selectedType: string;
  defaultType;
  bgOptions: DropdownOption[] = [];
  bgObj: AttributeType & { propName: string };
  selectedBg: string;
  defaultBg: string;

  topFilterFormStates: { [key: string]: string } = {};

  constructor(
    private cegService: ExampleCodeService,
    private cegCodeUpdaterService: CegCodeUpdaterService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.cegCodes = {
      angular: this.componentData.codeAngular ? this.componentData.codeAngular : '',
      react: this.componentData.codeReact ? this.componentData.codeReact : '',
      vue: this.componentData.codeVue ? this.componentData.codeVue : '',
      native: this.componentData.codeNativeHTML ? this.componentData.codeNativeHTML : '',
    };
    if (this.inlineExample) {
      return;
    }
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
      this.updateCegFrame(code);
    });

    this.initializeSideFilterFormGroups();
    this.initializeTopFilters();
    setTimeout(() => {
      this.initializeCustomTextProps();
    }, 250);
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

  /**
   * Called whenever any of the dropdowns in the CEG is changed.
   */
  updateFormStates(propName: string, event: DropdownEvent): void {
    const value = event.detail.value.label;
    this.addToFormStates(propName, value);
    this.updateCustomTextVisibility();
  }

  /**
   * Called every time the dropdown controlling the type of a component is changed.
   *
   * **NB**: This method applies to components **not** using `typesData`!
   */
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

  /**
   * Called every time the dropdown controlling the type of a component is changed.
   *
   * **NB**: This method applies to components using `typesData`!
   */
  updateSelectedTypeCustom(event: DropdownEvent): void {
    const label = event.detail.value.label;
    this.typesData.forEach((element) => {
      if (element.type === label.toLowerCase()) {
        this.selectedType = label;
        this.cegCodes.react = element.codeReact;
        this.cegCodes.angular = element.codeAngular;
        this.cegCodes.vue = element.codeVue ? element.codeVue : '';
        this.cegCodes.native = element.codeNativeHTML;
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
    setTimeout(() => {
      this.initializeCustomTextProps();
    });
  }

  /**
   * Called every time the dropdown controlling the background of a component is changed.
   */
  updateSelectedBg(event: DropdownEvent): void {
    const label = event.detail.value.label;
    this.selectedBg = label;
    if (this.bgObj.cegOptions[this.bgObj.cegDefault as string] === label) {
      this.updateSelected(this.bgObj.propName, this.bgObj.default as string, 'boolean');
    } else {
      this.updateSelected(this.bgObj.propName, '' + (this.bgObj.default == 'false'), 'boolean');
    }
  }

  /**
   * Gets called every time there is a change in the side filters. Toggles the visibility of the prop in the *Customize text*-popover.
   * @param event Contains the name of the prop changed and its new value, or whether to turn on or off the `cegDefault`.
   */
  updateSideFilter(event: CegSideFilterEvent): void {
    const propName = event.name.toLowerCase();
    if (propName in this.customTextProps) {
      this.customTextProps[propName].active = !this.customTextProps[propName].active;

      // Reset value to default
      let componentData: ComponentData;
      if (this.typesData) {
        const selectedTypeIndex = this.typeOptions.find((option) => option.label === this.selectedType).value;
        componentData = this.typesData[selectedTypeIndex];
      } else {
        componentData = this.componentData;
      }
      this.customTextProps[propName].value = componentData.attributes[propName].cegDefault;
    }
  }

  /**
   * Used to order the elements in the *Customize text*-popover.
   * @param _left
   * @param _right
   * @returns
   */
  keepOriginalOrderInCustomTextPopover(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _left: KeyValue<string, typeof this.customTextProps[0]>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _right: KeyValue<string, typeof this.customTextProps[0]>,
  ): 1 {
    return 1;
  }

  /**
   * Updates the content in the CEG to reflect what is in the `this.customTextProps`-object.
   */
  updateCustomTextProps(): void {
    Object.entries(this.customTextProps).forEach(([prop, value]) => {
      // Remove empty props, otherwise update
      if (value.value) {
        this.updateSelected(prop, value.value.toString(), 'string', false);
      } else {
        this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, prop);
      }
      this.updateExampleCode();
    });
  }

  removeAllCustomTextProps(): void {
    Object.keys(this.customTextProps).forEach((prop) => {
      this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, prop);
    });
  }

  getCustomTextLabel(propName: string): string {
    return propName.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  updateCustomTextVisibility(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      if (this.componentData.attributes[attribute].cegFormType === 'custom-text') {
        this.showCustomTextPopover = this.isCustomTextVisible(this.componentData.attributes[attribute]);
        if (!this.showCustomTextPopover) {
          this.removeAllCustomTextProps();
        } else {
          this.updateCustomTextProps();
        }
      }
    });
  }

  isCustomTextVisible(attributeData: AttributeType): boolean {
    let isCustomTextVisible = false;
    if (attributeData.cegDependency) {
      attributeData.cegDependency.forEach((dependency) => {
        if (dependency.value.includes(this.topFilterFormStates[dependency.name])) {
          isCustomTextVisible = true;
          return;
        } else {
          isCustomTextVisible = false;
        }
      });
    } else {
      isCustomTextVisible = true;
    }
    return isCustomTextVisible;
  }

  /**
   * Initializes `this.customTextProps` to hold the props that should have customizable text.
   *
   * If `typesData` is provided, it will use attribute information from there instead (see `card-simple-code.ts` and `card-detail-code.ts`, or `popover-informative-code.ts`, for examples).
   */
  private initializeCustomTextProps(): void {
    let componentData: ComponentData;
    if (this.typesData) {
      const selectedTypeIndex = this.typeOptions.find((option) => option.label === this.selectedType).value;
      componentData = this.typesData[selectedTypeIndex];
    } else {
      componentData = this.componentData;
    }

    if (!componentData.attributes) {
      this.showCustomTextPopover = false;
      return;
    }

    this.customTextProps = {};
    let isCustomTextVisible = false;
    Object.entries(componentData.attributes).forEach(([attribute, attributeData]) => {
      if (attributeData.cegFormType === 'custom-text') {
        isCustomTextVisible = this.isCustomTextVisible(attributeData);
        this.customTextProps[attribute] = {
          value: attributeData.cegDefault ?? '',
          type: attributeData.cegCustomTextType ?? 'input',
          active: true,
        };
      }
    });
    setTimeout(() => {
      this.updateCustomTextProps();
    });
    this.hasCustomTextProps = Object.keys(this.customTextProps).length > 0;
    this.showCustomTextPopover = isCustomTextVisible;
  }

  /**
   * Updates the value of a property in the CEG codes.
   * @param attr Name of the attribute to update.
   * @param newValue New value of the attribute.
   * @param cegType Type of the attribute (e.g. string, boolean).
   * @param updateExampleCode Whether to update code examples in the CEG (default true).
   */
  private updateSelected(attr: string, newValue: string, cegType: string, updateExampleCode?: boolean): void {
    const updateCode = updateExampleCode ? updateExampleCode : true;
    if (this.cegCodes.angular.includes(`[${attr}]`)) {
      this.cegCodes = this.cegCodeUpdaterService.replaceOldProps(this.cegCodes, attr, newValue, cegType);
    } else {
      this.cegCodes = this.cegCodeUpdaterService.addNewProps(
        this.cegCodes,
        this.componentData,
        attr,
        newValue,
        cegType,
      );
    }
    if (updateCode) {
      this.updateExampleCode();
    }
  }

  /**
   * Called during `ngOnInit` to initialize the forms for the CEG side filters. Populates the `this.formGroupList`-object from `this.componentData.attributes`.
   */
  private initializeSideFilterFormGroups(): void {
    const props = this.componentData.attributes;
    let checkboxIndex: number = undefined;
    const filteringAttributeKeys = Object.keys(this.componentData.attributes).filter((propKey) => {
      return (
        props[propKey].cegFormType &&
        props[propKey].cegFormType !== 'type' &&
        props[propKey].cegFormType !== 'background'
      );
    });
    filteringAttributeKeys.forEach((propKey, index) => {
      const prop = props[propKey];
      if (!prop.cegFormType) {
        return;
      }
      const formType = prop.cegFormType;
      if (formType === 'radio') {
        const formGroupOptions = prop.cegOptions.map((option, i) => {
          const formOption: CegFormGroupOption = {
            name: option,
            defaultValue: prop.cegDefault === option,
          };
          if (prop.cegOptionsLabel) {
            formOption.label = prop.cegOptionsLabel[i];
          }
          return formOption;
        });
        const formGroupObject: CegFormGroup = {
          formType: formType,
          label: prop.cegDisplayName,
          type: prop.cegType,
          formGroupOptions: formGroupOptions,
          propName: propKey,
          dependency: prop.cegDependency,
          defaultValue: prop.cegDefault,
          labelTypography: prop.cegLabelTypography,
        };
        this.formGroupList.push(formGroupObject);
      } else if (formType === 'checkbox') {
        const checkboxObject: typeof this.allCheckboxes[0] = {
          propName: propKey,
          ...prop,
        };
        this.allCheckboxes.push(checkboxObject);
        if (checkboxIndex === undefined) {
          checkboxIndex = index;
        }
      } else if (formType === 'toggle') {
        const formGroupObject: CegFormGroup = {
          formType: formType,
          label: prop.cegDisplayName,
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
        const formGroupObject: CegFormGroup = {
          formType: formType,
          label: prop.cegDisplayName,
          type: prop.cegType,
          defaultValue: prop.cegDefault,
          propName: propKey,
          counterMax: prop.cegCounterMax,
          counterMin: prop.cegCounterMin,
          counterStepValue: prop.cegStepValue,
          counterType: prop.cegCounterType,
          dependency: prop.cegDependency,
        };
        this.formGroupList.push(formGroupObject);
      }
    });
    this.initializeCheckboxFormGroups(checkboxIndex);
  }

  /**
   * Called by `this.initializeSideFilterFormGroups` to initialize the checkboxes in the CEG side filters.
   */
  private initializeCheckboxFormGroups(checkboxIndex: number): void {
    const checkboxGroups = this.sortCheckboxesByGroup(this.allCheckboxes);
    const checkboxList = [];
    Object.keys(checkboxGroups).forEach((checkboxGroupKey) => {
      const formGroupOptions = [];
      checkboxGroups[checkboxGroupKey].forEach((checkbox) => {
        const formOption: CegFormGroup = {
          formType: 'checkbox',
          name: checkbox.cegDisplayName,
          defaultValue: checkbox.cegDefault ? checkbox.cegDefault : false,
          propName: checkbox.propName,
          propValue: checkbox.cegOption,
          dependency: checkbox.cegDependency,
          type: checkbox.cegType,
        };
        formGroupOptions.push(formOption);
      });
      const checkboxFormGroupOption = {
        label: checkboxGroupKey,
        formType: 'checkbox',
        formGroupOptions,
      };
      checkboxList.push(checkboxFormGroupOption);
    });
    this.formGroupList.splice(checkboxIndex, 0, ...checkboxList);
  }

  private initializeTopFilters(): void {
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
        this.defaultIcon = { value: 'addCircle', label: 'Add Circle', icon: 'addCircle' };
        for (const icon in ElvisIcons) {
          const labelName = icon.replace(/([A-Z])/g, ' $1');
          const finalLabel = labelName.charAt(0).toUpperCase() + labelName.slice(1);
          this.iconsOptions.push({ value: icon, label: finalLabel, icon: icon });
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

  /**
   * Sorts CEG side filter checkboxes by their `cegDisplayGroup` property.
   * All properties with the same `cegDisplayGroup` will be displayed under the same group.
   * @returns Object where each key is a `cegDisplayGroup` and the value is an array of checkboxes with that `cegDisplayGroup`.
   */
  private sortCheckboxesByGroup<T extends typeof this.allCheckboxes>(
    checkboxGroups: T,
  ): { [cegDisplayGroup: string]: T } {
    const checkboxArrays = checkboxGroups.reduce((obj, value) => {
      const key = value.cegDisplayGroup;
      if (obj[key] == null) {
        obj[key] = [];
      }
      obj[key].push(value);
      return obj;
    }, {});
    return checkboxArrays;
  }

  private addToFormStates(key: string, value: string | number | boolean): void {
    this.topFilterFormStates = {
      ...this.topFilterFormStates,
      [key]: value.toString().toLowerCase(),
    };
  }

  private updateCegFrame(code: string): void {
    this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(code);
    if (this.componentData.codeNativeScript) {
      setTimeout(() => eval(this.componentData.codeNativeScript), 200);
    }
  }

  // CEG code-view updates
  private updateExampleCode(): void {
    this.cegService.updateCodeReact(this.cegCodes.react);
    this.cegService.updateCodeAngular(this.cegCodes.angular);
    this.cegService.updateCodeVue(this.cegCodes.vue);
    this.cegService.updateCodeNative(this.cegCodes.native);
  }
}
