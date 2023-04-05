export abstract class StaticCegContent {
  /**
   * The raw input from the HTML file. This can be fetched via:
   *
   * ```ts
   * import { StaticCegContent } from 'src/app/shared/component-documentation/ceg';
   *
   * import * as template from 'html-loader!./my-example.component.html';
   *
   * ...
   *   providers: [{ provide: StaticCegContent, useExisting: MyExampleComponent }],
   * })
   * export class MyExampleComponent {
   *   html = template.default;
   * }
   * ```
   */
  html: string;
}
