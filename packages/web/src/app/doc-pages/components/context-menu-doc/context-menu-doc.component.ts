import { Component } from '@angular/core';
import { contextMenuData } from './context-menu-data';
import { ContextMenuDisabledCegComponent } from './context-menu-disabled-ceg/context-menu-disabled-ceg.component';
import { ContextMenuSelectableCegComponent } from './context-menu-selectable-ceg/context-menu-selectable-ceg.component';
import { ContextMenuHeadingsCegComponent } from './context-menu-headings-ceg/context-menu-headings-ceg.component';
import { ContextMenuIconsCegComponent } from './context-menu-icons-ceg/context-menu-icons-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ContextMenuCegComponent } from './context-menu-ceg/context-menu-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
    selector: 'app-context-menu-doc',
    templateUrl: './context-menu-doc.component.html',
    styleUrls: ['./context-menu-doc.component.scss'],
    standalone: true,
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        ContextMenuCegComponent,
        ComponentSectionComponent,
        ComponentSubsubsectionComponent,
        WhenToUseComponent,
        ComponentSubsectionComponent,
        StaticCegComponent,
        ContextMenuIconsCegComponent,
        ContextMenuHeadingsCegComponent,
        ContextMenuSelectableCegComponent,
        ContextMenuDisabledCegComponent,
    ],
})
export class ContextMenuDocComponent {
  componentData = contextMenuData;

  does = ['Help user perform actions when space is limited'];
  donts = ['When the actions are crucial to complete a workflow'];
}
