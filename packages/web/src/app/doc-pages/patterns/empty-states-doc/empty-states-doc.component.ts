import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
