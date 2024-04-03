import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmptyStatesFullPageExampleComponent } from './empty-states-full-page-example/empty-states-full-page-example.component';
import { EmptyStatesLeftAlignedExampleComponent } from './empty-states-left-aligned-example/empty-states-left-aligned-example.component';
import { EmptyStatesSmallerSectionsExample1Component } from './empty-states-smaller-sections-example-1/empty-states-smaller-sections-example.component-1';
import { EmptyStatesSmallerSectionsExample2Component } from './empty-states-smaller-sections-example-2/empty-states-smaller-sections-example-2.component';
import { EmptyStatesTopExampleComponent } from './empty-states-top-example/empty-states-top-example.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const emptyStatesDocPage = getDocPagesNotFromCMS('empty-states');

@Component({
  selector: 'app-empty-states-doc',
  standalone: true,
  imports: [
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentHeaderComponent,
    RouterLink,
    EmptyStatesFullPageExampleComponent,
    EmptyStatesLeftAlignedExampleComponent,
    EmptyStatesSmallerSectionsExample1Component,
    EmptyStatesSmallerSectionsExample2Component,
    EmptyStatesTopExampleComponent,
  ],
  templateUrl: './empty-states-doc.component.html',
  styleUrl: './empty-states-doc.component.scss',
})
export class EmptyStatesDocComponent {
  title = emptyStatesDocPage?.title;
  description = emptyStatesDocPage?.description;
  figmaUrl = emptyStatesDocPage?.figmaUrl;
}
