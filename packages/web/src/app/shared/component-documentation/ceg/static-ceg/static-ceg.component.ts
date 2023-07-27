import { Component, ContentChild, Input, booleanAttribute } from '@angular/core';
import { StaticComponentExample } from './static-component-example';

@Component({
  selector: 'app-static-ceg',
  templateUrl: './static-ceg.component.html',
  styleUrls: ['./static-ceg.component.scss', '../shared-styles.scss'],
})
export class StaticCegComponent {
  @ContentChild(StaticComponentExample, { static: true }) staticContent: StaticComponentExample;
  @Input({ transform: booleanAttribute }) hideReact: boolean;
  @Input({ transform: booleanAttribute }) phoneExample: boolean;
  @Input({ transform: booleanAttribute }) inverted: boolean;
}
