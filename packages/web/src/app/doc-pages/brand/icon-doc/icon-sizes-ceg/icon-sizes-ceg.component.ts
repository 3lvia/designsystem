import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./icon-sizes-ceg.component.html';

@Component({
  selector: 'app-icon-sizes-ceg',
  templateUrl: './icon-sizes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconSizesCegComponent }],
})
export class IconSizesCegComponent implements StaticComponentExample {
  html = template.default;
}
