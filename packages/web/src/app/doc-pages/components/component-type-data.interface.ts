import { AttributeTypeCEG, ComponentDataCode } from './component-data.interface';

// The 'codeNativeScript' is used from the main ComponentData object, therefore it is omitted here.
export default interface ComponentTypeData extends Omit<ComponentDataCode, 'codeNativeScript'> {
  /**
   * The type corresponding to this code example. Each example must have it's own unique type. Will be displayed as a dropdown on top of the CEG.
   */
  type: string;

  attributes?: {
    [attribute: string]: AttributeTypeCEG;
  };
}
