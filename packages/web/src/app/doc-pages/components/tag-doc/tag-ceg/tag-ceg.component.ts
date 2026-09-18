import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './tag-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-tag-ceg',
  templateUrl: './tag-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: TagCegComponent }],
})
export class TagCegComponent implements StaticComponentExample {
  html = template.default;
}
