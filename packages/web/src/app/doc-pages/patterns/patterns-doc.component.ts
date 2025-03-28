import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getDocPagesByType } from 'src/app/shared/doc-pages';
import { InlineSvgComponent } from 'src/app/shared/inline-svg/inline-svg.component';

@Component({
  selector: 'app-patterns-doc',
  imports: [RouterLink, InlineSvgComponent],
  templateUrl: './patterns-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatternsDocComponent {
  docPages = getDocPagesByType('Patterns');
}
