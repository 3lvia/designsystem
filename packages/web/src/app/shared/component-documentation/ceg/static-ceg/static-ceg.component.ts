import { Component, ContentChild } from '@angular/core';
import { StaticCegContent } from './static-ceg-content';

@Component({
  selector: 'app-static-ceg',
  templateUrl: './static-ceg.component.html',
  styleUrls: ['./static-ceg.component.scss', '../shared-styles.scss'],
})
export class StaticCegComponent {
  @ContentChild(StaticCegContent, { static: true }) staticContent: StaticCegContent;
}
