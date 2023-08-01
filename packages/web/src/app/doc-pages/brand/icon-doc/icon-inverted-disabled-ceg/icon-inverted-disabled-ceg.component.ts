import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./icon-inverted-disabled-ceg.component.html';

@Component({
  selector: 'app-icon-inverted-disabled-ceg',
  templateUrl: './icon-inverted-disabled-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconInvertedDisabledCegComponent }],
})
export class IconInvertedDisabledCegComponent implements StaticComponentExample {
  html = template.default;
}
