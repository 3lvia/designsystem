import { Component, booleanAttribute, input } from '@angular/core';

import { SubMenuComponent } from '../../../navbar/sub-menu/sub-menu.component';
import { IfViewportSizeDirective } from '../../../viewport-size/if-viewport-size.directive';
import { ComponentHeaderQuickInstallComponent } from './component-header-quick-install/component-header-quick-install.component';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
  imports: [ComponentHeaderQuickInstallComponent, IfViewportSizeDirective, SubMenuComponent],
})
export class ComponentHeaderComponent {
  readonly figmaUrl = input<string>();
  readonly lastUpdated = input<string>();
  readonly componentData = input<ComponentData>();
  readonly showCssLibraryTag = input(false, { transform: booleanAttribute });
}
