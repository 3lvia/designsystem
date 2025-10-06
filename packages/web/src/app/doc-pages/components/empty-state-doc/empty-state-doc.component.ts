import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmptyStateCegComponent } from './empty-state-ceg/empty-state-ceg.component';
import { EmptyStateTypeDefaultCegComponent } from './empty-state-type-default-ceg/empty-state-type-default-ceg.component';
import { EmptyStateTypeLargeCegComponent } from './empty-state-type-large-ceg/empty-state-type-large-ceg.component';
import { EmptyStateTypeStartAlignedCegComponent } from './empty-state-type-start-aligned-ceg/empty-state-type-start-aligned-ceg.component';
import { StaticCegComponent } from 'src/app/shared/component-documentation/ceg';
import { ComponentDocumentationComponent } from 'src/app/shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from 'src/app/shared/when-to-use/when-to-use.component';

@Component({
  selector: 'app-empty-state-doc',
  imports: [
    ComponentDocumentationComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    EmptyStateCegComponent,
    EmptyStateTypeDefaultCegComponent,
    RouterLink,
    StaticCegComponent,
    WhenToUseComponent,
    EmptyStateTypeLargeCegComponent,
    EmptyStateTypeStartAlignedCegComponent,
  ],
  templateUrl: './empty-state-doc.component.html',
})
export class EmptyStateDocComponent {
  protected whenToUse = [
    'First visit with no data',
    'All data cleared',
    'Error or loading issue',
    'No search results',
  ];
  protected whenNotToUse = ['To indicate progress or loading'];
}
