import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getDocPagesByType } from 'src/app/shared/doc-pages';
import { InlineSvgComponent } from 'src/app/shared/inline-svg/inline-svg.component';

@Component({
  selector: 'app-brand-doc',
  imports: [RouterLink, InlineSvgComponent],
  templateUrl: './brand-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BrandDocComponent {
  docPages = getDocPagesByType('Brand');
}
