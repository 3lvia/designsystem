// @ts-nocheck
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
import { ElviaDropdownItem } from '@elvia/elvis-dropdown';

type CustomTextProps = {
  [prop: string]: {
    value: AttributeType['cegDefault'];
    type: AttributeType['cegCustomTextType'];
    active: boolean;
    orderOfPropsDisplayed: number;
  };
};

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
  @Input() tabIdPrefix = 'ceg';

  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  cegCodes: CegCodes;
  dynamicCode: SafeHtml;

  customTextProps: CustomTextProps = {};
  hasCustomTextProps = false;
  showCustomTextPopover = false;
  customTextPopoverIsOpen = false;

  mobileSideFilterPopoverIsOpen = false;
  enableFilters = true;
  hasSideFilters = true;
  formGroupList: CegFormGroup[] = [];
  allCheckboxes: (AttributeType & { propName: string })[] = [];

  iconsOptions: ElviaDropdownItem[] = [];
  selectedIcon: ElviaDropdownItem;
  defaultIcon: string;

  typeOptions: ElviaDropdownItem[] = [];
  selectedType: string;
  defaultType;
  bgOptions: ElviaDropdownItem[] = [];
  bgObj: AttributeType & { propName: string };
  selectedBg: string;
  defaultBg: number;

  topFilterFormStates: { [key: string]: string } = {};
  sideFilterFormStates: { [key: string]: string | number | boolean } = {};

  constructor(
    private cegService: ExampleCodeService,
    private cegCodeUpdaterService: CegCodeUpdaterService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    if (this.typesData?.length > 0) {
      this.cegCodes = {
        angular: this.typesData[0].codeAngular ?? '',
        react: this.typesData[0].codeReact ?? '',
        vue: this.typesData[0].codeVue ?? '',
        native: this.typesData[0].codeNativeHTML ?? '',
      };
    } else {
      this.cegCodes = {
        angular: this.componentData.codeAngular ?? '',
        react: this.componentData.codeReact ?? '',
        vue: this.componentData.codeVue ?? '',
        native: this.componentData.codeNativeHTML ?? '',
      };
    }
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
      if (this.typesData?.length > 0) {
        this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(this.typesData[0].codeNativeHTML);
      } else {
        this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML ?? '');
      }
      if (this.componentData.codeNativeScript) {
        setTimeout(() => eval(this.componentData.codeNativeScript!), 200);
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
  updateFormStates(propName: string, list: ElviaDropdownItem[], event: DropdownEvent): void {
    const label = list.find((item) => item.value === event.detail.value).label;
    this.addToFormStates(propName, label);
    this.updateCustomTextVisibility();
  }

  /**
   * Called every time the dropdown controlling the type of a component is changed.
   *
   * **NB**: This method applies to components **not** using `typesData`!
   */
  updateSelectedType(event: DropdownEvent, list: ElviaDropdownItem[], icon?: boolean): void {
    const value = event.detail.value;
    const label = list.find((item) => item.value === value).label;
    this.selectedType = label;
    let newValue: string;
    if (!icon || icon === undefined) {
      newValue = label.toLowerCase();
      this.updateSelected('type', newValue, 'string');
    } else {
      this.updateSelected('name', value, 'string');
    }
    /** HACK: CEG hide accordion large size when single (Replace if more scenarios appear) */
    if (this.selectedType === 'Single' && this.componentData.name === 'Accordion') {
      document.getElementById('Size-large-true')?.parentElement?.classList.add('e-none');
    }
  }

  /**
   * Called every time the dropdown controlling the type of a component is changed.
   *
   * **NB**: This method applies to components using `typesData`!
   */
  updateSelectedTypeCustom(event: DropdownEvent, list: ElviaDropdownItem[]): void {
    const value = event.detail.value;
    const label = list.find((item) => item.value === value).label;
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
  updateSelectedBg(event: DropdownEvent, list: ElviaDropdownItem[]): void {
    const value = event.detail.value;
    const label = list.find((item) => item.value === value).label;
    this.selectedBg = label;
    if (this.bgObj.cegOptions?.[this.bgObj.cegDefault as string] === label) {
      this.updateSelected(this.bgObj.propName, this.bgObj.default as string, 'boolean');
    } else {
      this.updateSelected(this.bgObj.propName, '' + (this.bgObj.default == 'false'), 'boolean');
    }
    setTimeout(() => {
      this.updateCustomTextVisibility();
    });
  }

  /**
   * Gets called every time there is a change in the side filters. Toggles the visibility of the prop in the *Customize text*-popover.
   * @param event Contains the name of the prop changed and its new value, or whether to turn on or off the `cegDefault`.
   */
  updateSideFilter(event: CegSideFilterEvent): void {
    this.sideFilterFormStates[event.name] = event.value;
    const propName = event.name.toLowerCase();
    if (propName in this.customTextProps) {
      this.customTextProps[propName].active = this.customTextPropShouldBeVisible(propName);

      // Reset value to default
      const componentData = this.getComponentDataForCurrentType();
      this.customTextProps[propName].value = componentData.attributes?.[propName].cegDefault;
    } else {
      Object.keys(this.customTextProps).forEach((key) => {
        this.componentData.attributes[key].cegDependency?.forEach((dependency) => {
          if (dependency.name === event.name) {
            if (dependency.value.includes(event.value.toString())) {
              this.customTextProps[key].active = this.customTextPropShouldBeVisible(key);
            } else {
              this.customTextProps[key].active = false;
            }
          }
        });
      });
    }
    this.updateCustomTextVisibility();
  }

  /**
   * Used to order the elements in the *Customize text*-popover.
   * @param left
   * @param right
   * @returns
   */
  keepOriginalOrderInCustomTextPopover(
    left: KeyValue<string, CustomTextProps[0]>,
    right: KeyValue<string, CustomTextProps[0]>,
  ): number {
    return left.value.orderOfPropsDisplayed > right.value.orderOfPropsDisplayed ? 1 : -1;
  }

  /**
   * Updates the content in the CEG to reflect what is in the `this.customTextProps`-object.
   */
  updateCustomTextProps(): void {
    Object.entries(this.customTextProps).forEach(([prop, value]) => {
      // Remove empty props, otherwise update
      if (!value.active) {
        this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, prop);
      } else if (value.value) {
        this.updateSelected(prop, value.value.toString(), 'string', false);
      } else {
        this.cegCodes = this.cegCodeUpdaterService.removeProps(this.cegCodes, prop);
      }
      setTimeout(() => {
        this.updateExampleCode();
      });
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

  resetCustomTextProps(): void {
    this.initializeCustomTextProps();
  }

  /**
   * Updates the *Customize text*-popover by checking if any of the `custom-text`-attributes
   * have their dependencies met.
   *
   * Will set the `this.showCustomTextPopover`-variable to `true` if any of the `custom-text`-attributes
   * are visible, and update the code in the CEG.
   */
  private updateCustomTextVisibility(): void {
    const componentData = this.getComponentDataForCurrentType();
    if (!componentData.attributes) {
      this.showCustomTextPopover = false;
      return;
    }

    this.showCustomTextPopover = Object.keys(componentData.attributes)
      .filter((attribute) => componentData.attributes?.[attribute].cegFormType === 'custom-text')
      .some((attribute) => this.customTextPropShouldBeVisible(attribute));
    if (!this.showCustomTextPopover) {
      this.removeAllCustomTextProps();
    } else {
      this.updateCustomTextProps();
    }
  }

  /**
   * Initializes `this.customTextProps` to hold the props that should have customizable text.
   *
   * If `typesData` is provided, it will use attribute information from there instead (see `card-simple-code.ts` and `card-detail-code.ts`, or `popover-informative-code.ts`, for examples).
   */
  private initializeCustomTextProps(): void {
    const componentData = this.getComponentDataForCurrentType();
    if (!componentData.attributes) {
      this.showCustomTextPopover = false;
      return;
    }

    this.customTextProps = {};
    Object.entries(componentData.attributes).forEach(([attribute, attributeData], idx) => {
      if (attributeData.cegFormType === 'custom-text') {
        this.customTextProps[attribute] = {
          value: attributeData.cegDefault ?? '',
          type: attributeData.cegCustomTextType ?? 'input',
          active: this.customTextPropShouldBeVisible(attribute),
          orderOfPropsDisplayed: idx,
        };
      }
    });
    setTimeout(() => {
      this.updateCustomTextVisibility();
    });
    this.hasCustomTextProps = Object.keys(this.customTextProps).length > 0;
  }

  /**
   * Checks if a props `cegDependency`-values are met.
   * @param propName The name of the prop to check.
   * @returns Whether the `cegDependency`-values are met (i.e. whether the prop should be visible in the customize text-popover).
   * @modifies `this.customTextProps[propName].active` will be set to the same value as the return value.
   */
  private customTextPropShouldBeVisible(propName: string): boolean {
    const componentData = this.getComponentDataForCurrentType();
    if (!(componentData.attributes && componentData.attributes[propName])) {
      return false;
    }

    // Type "toggle" should turn on or off a custom text prop's visibility in the popover
    if (this.componentData.attributes[propName].cegFormType === 'toggle') {
      // cast the side filter state to boolean (could be string or boolean)
      const newValue = this.sideFilterFormStates[propName].toString().toLowerCase() === 'true';
      if (this.customTextProps[propName]) {
        this.customTextProps[propName].active = newValue;
      }
      return newValue;
    }

    if (componentData.attributes[propName].cegDependency) {
      for (const dependency of componentData.attributes[propName].cegDependency!) {
        if (
          !dependency.value.includes(this.topFilterFormStates[dependency.name]) &&
          !dependency.value.includes(this.sideFilterFormStates[dependency.name]?.toString())
        ) {
          if (this.customTextProps[propName]) {
            this.customTextProps[propName].active = false;
          }
          return false;
        }
      }
    }

    if (this.customTextProps[propName]) {
      this.customTextProps[propName].active = true;
    }
    return true;
  }

  /**
   * Updates the value of a property in the CEG codes.
   * @param attr Name of the attribute to update.
   * @param newValue New value of the attribute.
   * @param cegType Type of the attribute (e.g. string, boolean).
   * @param updateExampleCode Whether to update code examples in the CEG (default true).
   */
  private updateSelected(
    attr: string,
    newValue: string,
    cegType: string,
    updateExampleCode: boolean = true,
  ): void {
    if (this.cegCodes.angular?.includes(`[${attr}]`)) {
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
    if (updateExampleCode) {
      this.updateExampleCode();
    }
  }

  /**
   * Called during `ngOnInit` to initialize the forms for the CEG side filters. Populates the `this.formGroupList`-object from `this.componentData.attributes`.
   */
  private initializeSideFilterFormGroups(): void {
    const props = this.componentData.attributes;
    let checkboxIndex: any = undefined;
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
        const formGroupOptions =
          prop.cegOptions?.map((option, i) => {
            const formOption: CegFormGroupOption = {
              name: option,
              defaultValue: prop.cegDefault === option,
            };
            if (prop.cegOptionsLabel) {
              formOption.label = prop.cegOptionsLabel[i];
            }
            return formOption;
          }) ?? [];
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
        const checkboxObject: (typeof this.allCheckboxes)[0] = {
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
    this.initializeSideFilterFormStates();
  }

  /**
   * Called by `this.initializeSideFilterFormGroups` to initialize the checkboxes in the CEG side filters.
   */
  private initializeCheckboxFormGroups(checkboxIndex: number): void {
    const checkboxGroups = this.sortCheckboxesByGroup(this.allCheckboxes);
    const checkboxList: any = [];
    Object.keys(checkboxGroups).forEach((checkboxGroupKey) => {
      const formGroupOptions: CegFormGroup[] = [];
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

  /**
   * Initializes an object `this.sideFilterFormStates` that contains the form states for the CEG side filters.
   * The object is updated by an event from the `ceg-filters`-component.
   *
   * **NB**: Changing the object will **not** update the form states.
   */
  private initializeSideFilterFormStates(): void {
    this.formGroupList.forEach((formGroup) => {
      if (formGroup.formType === 'radio') {
        formGroup.formGroupOptions.forEach((option) => {
          if (option.defaultValue) {
            this.sideFilterFormStates[formGroup.propName] = option.name;
          }
        });
      } else if (formGroup.formType === 'checkbox') {
        formGroup.formGroupOptions?.forEach((option) => {
          this.sideFilterFormStates[option.propName!] = option.defaultValue;
        });
      } else if (formGroup.formType === 'toggle') {
        this.sideFilterFormStates[formGroup.propName] = formGroup.defaultValue as any;
      } else if (formGroup.formType === 'counter') {
        this.sideFilterFormStates[formGroup.propName] = formGroup.defaultValue as any;
      }
    });
  }

  /**
   *
   * @returns An object containing the component's `ComponentData`, or `ComponentTypeData` if using separate component data for each component type.
   */
  private getComponentDataForCurrentType(): ComponentData | ComponentTypeData {
    if (this.typesData) {
      const selectedTypeIndex = (
        this.typeOptions.find((option) => option.label === this.selectedType) ?? this.typeOptions[0]
      ).value;
      return this.typesData[selectedTypeIndex];
    } else {
      return this.componentData;
    }
  }

  private initializeTopFilters(): void {
    const props = this.componentData.attributes;
    Object.keys(props).forEach((propKey) => {
      const prop = props[propKey];
      const formType = prop.cegFormType;
      if (formType === 'type') {
        this.selectedType = prop.cegOptions![0];
        this.defaultType = prop.cegDefault;
        prop.cegOptions?.forEach((option, index) => {
          const label = option.charAt(0).toUpperCase() + option.slice(1);
          const newType = { value: index.toString(), label: label };
          this.typeOptions.push(newType);
        });
        this.addToFormStates(propKey, prop.cegOptions![prop.cegDefault as number]);
      } else if (formType === 'iconName') {
        this.selectedIcon = this.iconsOptions[0];
        this.defaultIcon = 'addCircle';
        for (const icon in ElvisIcons) {
          const labelName = icon.replace(/([A-Z])/g, ' $1');
          const finalLabel = labelName.charAt(0).toUpperCase() + labelName.slice(1);
          this.iconsOptions.push({ value: icon, label: finalLabel, icon: icon as ElvisIcons.IconName });
        }
        this.addToFormStates(propKey, this.iconsOptions[0].value);
      } else if (formType === 'background') {
        this.bgObj = {
          propName: propKey,
          ...prop,
        };
        this.selectedBg = prop.cegDefault as string;
        this.defaultBg = prop.cegDefault as string;
        this.bgObj.cegOptions?.forEach((option, index) => {
          const type = { value: index.toString(), label: option };
          this.bgOptions.push(type);
        });
        this.addToFormStates(propKey, prop.cegOptions![prop.cegDefault as number]);
      }
    });

    if (this.typesData) {
      this.typesData.forEach((option, index) => {
        const label = option.type.charAt(0).toUpperCase() + option.type.slice(1);
        const newType = { value: index.toString(), label: label };
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
      const key = value.cegDisplayGroup as string;
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
      setTimeout(() => eval(this.componentData.codeNativeScript!), 200);
    }
  }

  // CEG code-view updates
  private updateExampleCode(): void {
    this.cegService.updateCodeReact(this.cegCodes.react ?? '');
    this.cegService.updateCodeAngular(this.cegCodes.angular ?? '');
    this.cegService.updateCodeVue(this.cegCodes.vue ?? '');
    this.cegService.updateCodeNative(this.cegCodes.native ?? '');
  }
}
