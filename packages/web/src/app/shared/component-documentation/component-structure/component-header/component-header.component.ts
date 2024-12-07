import { Component, Input, booleanAttribute, input } from '@angular/core';

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
  ],
})
export class ComponentHeaderComponent {
  figmaUrl = input<string>();
  lastUpdated = input<string>();
  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input() componentData?: ComponentData;
  readonly showCssLibraryTag = input(false, { transform: booleanAttribute });
}
