import { Component } from '@angular/core';

import * as template from './tag-signal-colored-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-tag-signal-colored-ceg',
  templateUrl: './tag-signal-colored-ceg.component.html',
  styleUrl: './tag-signal-colored-ceg.component.scss',
  providers: [{ provide: StaticComponentExample, useExisting: TagSignalColoredCegComponent }],
  standalone: true,
})
export class TagSignalColoredCegComponent implements StaticComponentExample {
  html = template.default;
}
