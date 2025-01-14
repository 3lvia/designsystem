import { CegControlManager } from './cegControlManager';

export abstract class ComponentExample<T extends Record<string, any> = any> {
  /**
   * The element name.
   *
   * For the component &lt;elvia-datepicker-range&gt;, this would be "datepicker-range".
   * */
  // @ts-expect-error TS2564 (LEGO-3683)
  readonly elementName: string;

  /**
   * The CEG configuration.
   */
  // @ts-expect-error TS2564 (LEGO-3683)
  readonly cegContent: CegControlManager<T>;

  /**
   * Manual replacement of slots for React. This is only necessary in rare cases where
   * the DOM differs between the React-component and the web-component.
   */
  readonly reactSlotReplacement?: Partial<Record<keyof T, string>>;
}
