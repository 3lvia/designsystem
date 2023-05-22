import { BehaviorSubject } from 'rxjs';

/**
 * Extend this class in a component that implements `ExampleComponent`
 * to also provide TypeScript code examples. Update the TypeScript code by
 * calling the `setTypeScript` function with the updated code example.
 */
export class TypescriptComponentExample {
  private _typeScript = new BehaviorSubject('');
  typeScript = this._typeScript.asObservable();

  /**
   * Sets new code to be shown in the CEG.
   * @param code The TypeScript code that should be shown in the CEG.
   */
  setTypeScript(code: string): void {
    this._typeScript.next(code);
  }
}
