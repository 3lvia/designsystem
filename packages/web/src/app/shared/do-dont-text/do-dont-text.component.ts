import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

/**
 * @example
 * ```html
 * <app-do-dont-text>
 *   <ng-container ngProjectAs="do">
 *     <p>do this...</p>
 *   </ng-container>
 *   <ng-container ngProjectAs="dont">
 *     <p>don't do this...</p>
 *   </ng-container>
 * </app-do-dont-text>
 * ```
 */
@Component({
  selector: 'app-do-dont-text',
  templateUrl: './do-dont-text.component.html',
  styleUrls: ['./do-dont-text.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DoDontTextComponent {}
