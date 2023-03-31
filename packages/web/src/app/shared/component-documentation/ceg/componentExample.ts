import { CegControlManager } from './cegControlManager';

export abstract class ComponentExample<T = unknown> {
  /**
   * The element name.
   *
   * For the component &lt;elvia-datepicker-range&gt;, this would be "datepicker-range".
   * */
  elementName: string;

  /**
   * The CEG configuration.
   */
  cegContent: CegControlManager<T>;
}
