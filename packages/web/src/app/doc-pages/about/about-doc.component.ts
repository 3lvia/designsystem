import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { InlineSvgComponent } from '../../shared/inline-svg/inline-svg.component';
import { getDocPagesByType } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-about-doc',
  imports: [RouterLink, InlineSvgComponent],
  templateUrl: './about-doc.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutDocComponent {
  docPages = getDocPagesByType('About');
}
