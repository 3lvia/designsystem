import { Component } from '@angular/core';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { TagCegComponent } from './tag-ceg/tag-ceg.component';
import { TagDataColoredCegComponent } from './tag-data-colored-ceg/tag-data-colored-ceg.component';
import { TagSignalColoredCegComponent } from './tag-signal-colored-ceg/tag-signal-colored-ceg.component';

@Component({
    selector: 'app-tag-doc',
    templateUrl: './tag-doc.component.html',
    styleUrls: ['./tag-doc.component.scss'],
    imports: [
        ComponentDocumentationComponent,
        StaticCegComponent,
        TagCegComponent,
        ComponentSectionComponent,
        ComponentSubsectionComponent,
        TagSignalColoredCegComponent,
        TagDataColoredCegComponent,
        WhenToUseComponent,
    ]
})
export class TagDocComponent {
  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = [
    'Do not use tags alone without pairing it with an item.',
    "Don't show numeric values ​​in a tag, then you should use data tags instead.",
  ];
}
