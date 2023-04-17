import { CegControlManager } from './cegControlManager';

export abstract class ComponentExample<T extends Record<string, any> = Record<string, any>> {
  /**
   * The element name.
   *
   * For the component &lt;elvia-datepicker-range&gt;, this would be "datepicker-range".
   * */
  readonly elementName: string;

  /**
   * The CEG configuration.
   */
  readonly cegContent: CegControlManager<T>;
}
