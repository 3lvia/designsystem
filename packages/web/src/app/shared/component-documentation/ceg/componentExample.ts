import { BehaviorSubject } from 'rxjs';
import { CegControlManager } from './cegControlManager';
import { CegCustomText, ControlConfiguration } from './controlType';

export abstract class ComponentExample {
  /**
   * The element name.
   *
   * For the component &lt;elvia-datepicker-range&gt;, this would be "datepicker-range".
   * */
  elementName: string;

  /**
   * The CEG content
   */
  cegContent: CegControlManager;

  /**
   * The currently selected control-set from the `controls` property.
   *
   * This can be used to change what kind of content should be visible
   * with the different control-sets. Omit if the CEG only has one control-sets.
   */
  currentControl?: BehaviorSubject<ControlConfiguration['name']>;

  /**
   * Allows for setting a custom text in the "Customize text" trigger.
   */
  customizeTextTriggerName?: string;
}
