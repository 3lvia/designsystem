import { NgIf } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

import ComponentData from 'src/app/doc-pages/components/component-data.interface';

import { SubMenuComponent } from '../../../navbar/sub-menu/sub-menu.component';
import { IfViewportSizeDirective } from '../../../viewport-size/if-viewport-size.directive';
import { ComponentDocumentationDatePipe } from '../../component-documentation-date-pipe';
import { ComponentHeaderQuickInstallComponent } from './component-header-quick-install/component-header-quick-install.component';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ComponentHeaderQuickInstallComponent,
    IfViewportSizeDirective,
    SubMenuComponent,
    ComponentDocumentationDatePipe,
  ],
})
export class ComponentHeaderComponent {
  @Input() figmaUrl?: string;
  @Input() lastUpdated?: string;
  @Input() componentData?: ComponentData;
  @Input({ transform: booleanAttribute }) showCssLibraryTag = false;
}
