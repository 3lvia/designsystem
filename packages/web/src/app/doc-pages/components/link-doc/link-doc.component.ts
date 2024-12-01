import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { DoDontTextComponent } from '../../../shared/do-dont-text/do-dont-text.component';
import { LinkActionCegComponent } from './link-action-ceg/link-action-ceg.component';
import { LinkAsBtnCegComponent } from './link-as-btn-ceg/link-as-btn-ceg.component';
import { LinkBackCegComponent } from './link-back-ceg/link-back-ceg.component';
import { LinkCegComponent } from './link-ceg/link-ceg.component';
import { LinkInlineCegComponent } from './link-inline-ceg/link-inline-ceg.component';
import { LinkNewTabCegComponent } from './link-new-tab-ceg/link-new-tab-ceg.component';
import { LinkSizesCegComponent } from './link-sizes-ceg/link-sizes-ceg.component';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    LinkCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    LinkInlineCegComponent,
    LinkNewTabCegComponent,
    LinkActionCegComponent,
    LinkBackCegComponent,
    RouterLink,
    LinkSizesCegComponent,
    DoDontTextComponent,
    ComponentSubsubsectionComponent,
    LinkAsBtnCegComponent,
  ],
})
export class LinkDocComponent {
  doExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Klikk her</a>`;
}
