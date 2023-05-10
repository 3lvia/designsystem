import { Component, ContentChild, Input } from '@angular/core';
import { StaticComponentExample } from './static-component-example';

@Component({
  selector: 'app-static-ceg',
  templateUrl: './static-ceg.component.html',
  styleUrls: ['./static-ceg.component.scss', '../shared-styles.scss'],
})
export class StaticCegComponent {
  @ContentChild(StaticComponentExample, { static: true }) staticContent: StaticComponentExample;
  @Input() hideReact: boolean;
}
