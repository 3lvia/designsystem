import { Component } from '@angular/core';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { TagCegComponent } from './tag-ceg/tag-ceg.component';
import { TagColoredCegComponent } from './tag-colored-ceg/tag-colored-ceg.component';

@Component({
  selector: 'app-tag-doc',
  templateUrl: './tag-doc.component.html',
  styleUrls: ['./tag-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    TagCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    TagColoredCegComponent,
    WhenToUseComponent,
  ],
})
export class TagDocComponent {
  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = [
    'Do not use tags alone without pairing it with an item.',
    "Don't show numeric values ​​in a tag, then you should use data tags instead.",
  ];
}
