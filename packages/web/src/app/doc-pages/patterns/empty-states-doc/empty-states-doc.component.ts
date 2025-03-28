import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmptyStatesClassListComponent } from './empty-states-class-list/empty-states-class-list.component';
import { EmptyStatesFullPageExampleComponent } from './empty-states-full-page-example/empty-states-full-page-example.component';
import { EmptyStatesLeftAlignedExampleComponent } from './empty-states-left-aligned-example/empty-states-left-aligned-example.component';
import { EmptyStatesSmallerSectionsExample1Component } from './empty-states-smaller-sections-example-1/empty-states-smaller-sections-example.component-1';
import { EmptyStatesSmallerSectionsExample2Component } from './empty-states-smaller-sections-example-2/empty-states-smaller-sections-example-2.component';
import { EmptyStatesTopExampleComponent } from './empty-states-top-example/empty-states-top-example.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('empty-states');

@Component({
  selector: 'app-empty-states-doc',
  imports: [
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentHeaderComponent,
    RouterLink,
    EmptyStatesClassListComponent,
    EmptyStatesFullPageExampleComponent,
    EmptyStatesLeftAlignedExampleComponent,
    EmptyStatesSmallerSectionsExample1Component,
    EmptyStatesSmallerSectionsExample2Component,
    EmptyStatesTopExampleComponent,
  ],
  templateUrl: './empty-states-doc.component.html',
})
export class EmptyStatesDocComponent {
  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
