import { CUSTOM_ELEMENTS_SCHEMA, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocPagePipe } from '../../../doc-pages/components/docPage.pipe';
import { DocPageName } from '../../shared.enum';

@Component({
  selector: 'app-component-related',
  templateUrl: './component-related.component.html',
  styleUrls: ['./component-related.component.scss'],
  imports: [RouterLink, DocPagePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentRelatedComponent {
  readonly relatedPages = input.required<DocPageName[]>();
}
