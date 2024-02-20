import { Component } from '@angular/core';
import { IconListCegComponent } from './list-icon-ceg/list-icon-ceg.component';
import { NumberedListCegComponent } from './list-numbered-ceg/list-numbered-ceg.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { BulletListCegComponent } from './list-bullet-ceg/list-bullet-ceg.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ListCegComponent } from './list-ceg/list-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    ListCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    BulletListCegComponent,
    WhenToUseComponent,
    NumberedListCegComponent,
    IconListCegComponent,
  ],
})
export class ListDocComponent {
  doesExample1 = ['Items that are in no required order.'];
  doesExample3 = [
    'When you need to have a priority or hierarchy between list items.',
    'Item in required order (step by step).',
  ];
  doesExample4 = ['When you need to list up definitions or explain items.'];
}
