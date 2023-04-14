// @ts-nocheck
import { Injectable } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { CegCodes } from 'src/app/shared/component-documentation/component-example/component-example-generator/ceg.interface';
import { ExampleCodeService } from 'src/app/shared/component-documentation/example-code.service';

/**
 * This service is used to add, update, or remove props and slots from the code shown in the CEG.
 */
@Injectable({
  providedIn: 'root',
})
export class CegCodeUpdaterService {
  constructor(private cegService: ExampleCodeService) {}

  /**
   * Add a prop that isn't already in the CEG to the CEG code texts.
   * @param cegCodes Object containing all the CEG code texts.
   * @param componentData Component data of the currently shown component in the CEG.
   * @param attr The name of the prop to replace.
   * @param newValue The new value of the prop.
   * @param type Type of the prop (e.g. 'string', 'number', 'boolean', etc.).
   * @returns The updated CEG code texts.
   */
  addNewProps(
    cegCodes: CegCodes,
    componentData: ComponentData,
    attr: string,
    newValue: string,
    type: string,
  ): CegCodes {
    const elNameR = componentData.name;
    const elNameW = this.getWebComponentElementName(componentData.name);
    return {
      react: this.cegService.addNewProp(cegCodes.react, attr, newValue, 'react', type, elNameR),
      angular: this.cegService.addNewProp(cegCodes.angular, attr, newValue, 'angular', type, elNameW),
      vue: this.cegService.addNewProp(cegCodes.vue, attr, newValue, 'vue', type, elNameW),
      native: this.cegService.addNewProp(cegCodes.native, attr, newValue, 'native', type, elNameW),
    };
  }

  /**
   * Replaces an already existing prop in the CEG code texts.
   * @param cegCodes Object containing all the CEG code texts.
   * @param attr The name of the prop to replace.
   * @param newValue The new value of the prop.
   * @param type Type of the prop (e.g. 'string', 'number', 'boolean', etc.).
   * @returns The updated CEG code texts.
   */
  replaceOldProps(cegCodes: CegCodes, attr: string, newValue: string, type: string): CegCodes {
    return {
      react: this.cegService.replaceOldProp(cegCodes.react, attr, newValue, 'react', type),
      angular: this.cegService.replaceOldProp(cegCodes.angular, attr, newValue, 'angular', type),
      vue: this.cegService.replaceOldProp(cegCodes.vue, attr, newValue, 'vue', type),
      native: this.cegService.replaceOldProp(cegCodes.native, attr, newValue, 'native', type),
    };
  }

  /**
   * Remove a prop from the CEG code texts.
   * @param cegCodes Object containing all the CEG code texts.
   * @param attr The name of the prop to replace.
   * @returns The updated CEG code texts.
   */
  removeProps(cegCodes: CegCodes, attr: string): CegCodes {
    return {
      react: this.cegService.removeProp(cegCodes.react, attr),
      angular: this.cegService.removeProp(cegCodes.angular, attr),
      vue: this.cegService.removeProp(cegCodes.vue, attr),
      native: this.cegService.removeProp(cegCodes.native, attr),
    };
  }

  addSlotAndProp(cegCodes: CegCodes, componentData: ComponentData, attr: string, value: string): CegCodes {
    const elNameR = componentData.name;
    const elNameW = this.getWebComponentElementName(componentData.name);
    return {
      react: this.cegService.addNewSlotAndProp(cegCodes.react, attr, value, 'react', elNameR),
      angular: this.cegService.addNewSlotAndProp(cegCodes.angular, attr, value, 'angular', elNameW),
      vue: this.cegService.addNewSlotAndProp(cegCodes.vue, attr, value, 'vue', elNameW),
      native: this.cegService.addNewSlotAndProp(cegCodes.native, attr, value, 'native', elNameW),
    };
  }

  removeSlotAndProp(cegCodes: CegCodes, componentData: ComponentData, attr: string, value: string): CegCodes {
    const elNameR = componentData.name;
    const elNameW = this.getWebComponentElementName(componentData.name);
    return {
      react: this.cegService.removeSlotAndProp(cegCodes.react!, attr, value, 'react', elNameR),
      angular: this.cegService.removeSlotAndProp(cegCodes.angular!, attr, value, 'angular', elNameW),
      vue: this.cegService.removeSlotAndProp(cegCodes.vue!, attr, value, 'vue', elNameW),
      native: this.cegService.removeSlotAndProp(cegCodes.native!, attr, value, 'native', elNameW),
    };
  }

  getWebComponentElementName(name: string) {
    return 'elvia' + name.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
}
