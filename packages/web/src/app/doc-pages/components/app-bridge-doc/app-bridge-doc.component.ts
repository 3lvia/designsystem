import { Component } from '@angular/core';

import { AppBridgeCegComponent } from './app-bridge-ceg/app-bridge-ceg.component';
import { appBridgeData } from './app-bridge-data';
import { CegComponent } from 'src/app/shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from 'src/app/shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';

@Component({
  selector: 'app-app-bridge-doc',
  standalone: true,
  imports: [CegComponent, AppBridgeCegComponent, ComponentDocumentationComponent, ComponentSectionComponent],
  templateUrl: './app-bridge-doc.component.html',
  styleUrl: './app-bridge-doc.component.scss',
})
export class AppBridgeDocComponent {
  componentData = appBridgeData;
}
