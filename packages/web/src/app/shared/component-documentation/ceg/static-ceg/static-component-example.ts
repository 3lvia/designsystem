export abstract class StaticComponentExample {
  /**
   * The raw input from the HTML file. This can be fetched via:
   *
   * ```ts
   * import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
   *
   * import * as template from './my-example.component.html';
   *
   * ...
   *   providers: [{ provide: StaticComponentExample, useExisting: MyExampleComponent }],
   * })
   * export class MyExampleComponent {
   *   html = template.default;
   * }
   * ```
   */
  // @ts-expect-error TS2564 (LEGO-3683)
  html: string;
  comment?: string;
}
