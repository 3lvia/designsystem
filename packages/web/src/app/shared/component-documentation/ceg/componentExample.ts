import { BehaviorSubject } from 'rxjs';
import { CegCustomText, ControlConfiguration, Controls } from './controlType';

export abstract class ComponentExample {
  /**
   * The element name.
   *
   * For the component &lt;elvia-datepicker-range&gt;, this would be "datepicker-range".
   * */
  elementName: string;

  /**
   * The controls that appear in the side panel to control the component.
   *
   * Can be defined as a single object (for components with a single type),
   * or as an array of configurations (for components with multiple CEG types).
   */
  controls: BehaviorSubject<ControlConfiguration[] | Controls>;

  /**
   * An array of custom texts. Omit if no custom texts are necessary.
   */
  customText?: CegCustomText[];

  /**
   * The currently selected control-set from the `controls` property.
   *
   * This can be used to change what kind of content should be visible
   * with the different control-sets. Omit if the CEG only has one control-sets.
   */
  currentControl?: BehaviorSubject<ControlConfiguration['name']>;
}
