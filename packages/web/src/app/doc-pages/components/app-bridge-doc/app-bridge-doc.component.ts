import { Component } from '@angular/core';

import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { AppBridgeCegComponent } from './app-bridge-ceg/app-bridge-ceg.component';
import { appBridgeData } from './app-bridge-data';
import { AppBridgePlacementComponent } from './app-bridge-placement/app-bridge-placement.component';
import { CegComponent } from 'src/app/shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from 'src/app/shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';

@Component({
  selector: 'app-app-bridge-doc',
  standalone: true,
  imports: [
    CegComponent,
    AppBridgeCegComponent,
    ComponentDocumentationComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    WhenToUseComponent,
    AppBridgePlacementComponent,
  ],
  templateUrl: './app-bridge-doc.component.html',
})
export class AppBridgeDocComponent {
  componentData = appBridgeData;
}
