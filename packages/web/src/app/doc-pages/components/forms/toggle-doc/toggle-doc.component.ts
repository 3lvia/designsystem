import { Component } from '@angular/core';
import { ToggleSizeSmCegComponent } from './toggle-size-sm-ceg/toggle-size-sm-ceg.component';
import { ToggleSizeMdCegComponent } from './toggle-size-md-ceg/toggle-size-md-ceg.component';
import { ToggleLabelCegComponent } from './toggle-label-ceg/toggle-label-ceg.component';
import { ToggleStatesCegComponent } from './toggle-states-ceg/toggle-states-ceg.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ToggleCegComponent } from './toggle-ceg/toggle-ceg.component';
import { StaticCegComponent } from '../../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    ToggleCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
    ToggleStatesCegComponent,
    ToggleLabelCegComponent,
    ToggleSizeMdCegComponent,
    ToggleSizeSmCegComponent,
  ],
})
export class ToggleDocComponent {
  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];
}
