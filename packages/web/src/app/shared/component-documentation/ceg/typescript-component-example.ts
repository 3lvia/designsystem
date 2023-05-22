import { BehaviorSubject } from 'rxjs';

/**
 * Extend this class in a component that implements `ExampleComponent`
 * to also provide Typescript code examples. Update the Typescript code by
 * calling the `setTypescript` function with the updated code example.
 */
export class TypescriptComponentExample {
  private _typeScript = new BehaviorSubject('');
  typeScript = this._typeScript.asObservable();

  /**
   * Sets new code to be shown in the CEG.
   * @param code The Typescript code that should be shown in the CEG.
   */
  setTypescript(code: string): void {
    this._typeScript.next(code);
  }
}
