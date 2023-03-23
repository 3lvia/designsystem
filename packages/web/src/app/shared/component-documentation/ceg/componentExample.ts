import { CegControlManager } from './cegControlManager';

export abstract class ComponentExample {
  /**
   * The element name.
   *
   * For the component &lt;elvia-datepicker-range&gt;, this would be "datepicker-range".
   * */
  elementName: string;

  /**
   * The CEG configuration.
   */
  cegContent: CegControlManager;

  /**
   * Allows for setting a custom text on the "Customize text" trigger.
   */
  customizeTextTriggerName?: string;
}
