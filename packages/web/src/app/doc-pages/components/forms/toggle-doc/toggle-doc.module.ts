import { NgModule } from '@angular/core';
import { ToggleDocComponent } from './toggle-doc.component';
import { ToggleCegComponent } from './toggle-ceg/toggle-ceg.component';
import { ToggleLabelCegComponent } from './toggle-label-ceg/toggle-label-ceg.component';
import { ToggleStatesCegComponent } from './toggle-states-ceg/toggle-states-ceg.component';
import { ToggleSizeMdCegComponent } from './toggle-size-md-ceg/toggle-size-md-ceg.component';
import { ToggleSizeSmCegComponent } from './toggle-size-sm-ceg/toggle-size-sm-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    ToggleDocComponent,
    ToggleCegComponent,
    ToggleLabelCegComponent,
    ToggleStatesCegComponent,
    ToggleSizeMdCegComponent,
    ToggleSizeSmCegComponent,
  ],
  imports: [SharedDocumentationModule],
})
export class ToggleDocModule {}
