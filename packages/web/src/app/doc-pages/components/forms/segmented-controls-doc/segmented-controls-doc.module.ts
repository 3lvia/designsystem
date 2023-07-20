import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SegmentedControlsDocComponent } from './segmented-controls-doc.component';
import { SegmentedControlCegComponent } from './segmented-control-ceg/segmented-control-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [SegmentedControlsDocComponent, SegmentedControlCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SegmentedControlsDocModule {}
