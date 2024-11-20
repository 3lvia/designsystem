import { Component, Input, booleanAttribute } from '@angular/core';

import { SubMenuComponent } from '../../../navbar/sub-menu/sub-menu.component';
import { IfViewportSizeDirective } from '../../../viewport-size/if-viewport-size.directive';
import { ComponentDocumentationDatePipe } from '../../component-documentation-date-pipe';
import { ComponentHeaderQuickInstallComponent } from './component-header-quick-install/component-header-quick-install.component';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
    selector: 'app-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    imports: [
        ComponentHeaderQuickInstallComponent,
        IfViewportSizeDirective,
        SubMenuComponent,
        ComponentDocumentationDatePipe,
    ]
})
export class ComponentHeaderComponent {
  @Input() figmaUrl?: string;
  @Input() lastUpdated?: string;
  @Input() componentData?: ComponentData;
  @Input({ transform: booleanAttribute }) showCssLibraryTag = false;
}
