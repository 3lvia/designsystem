import { AttributeTypeCEG, ComponentDataCode } from './component-data.interface';

// The 'codeNativeScript' is used from the main ComponentData object, therefore it is omitted here.
export default interface ComponentTypeData extends Omit<ComponentDataCode, 'codeNativeScript'> {
  /**
   * The type corresponding to this code example. Each example must have it's own unique type. Will be displayed as a dropdown on top of the CEG.
   */
  type: string;

  /**
   * The attributes should also be defined in the main `component-data.ts` to be documented in the property table.
   *
   * Attributes defined here will be used only for the *Custom text*-popover in the CEG.
   * This requires `cegFormType='custom-text'`, and the fields `cegCustomTextType` and `cegDefault` should be set.
   */
  attributes?: {
    [attribute: string]: AttributeTypeCEG;
  };
}
