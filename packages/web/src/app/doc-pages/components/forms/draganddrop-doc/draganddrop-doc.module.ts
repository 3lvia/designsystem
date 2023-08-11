import { NgModule } from '@angular/core';
import { DraganddropDocComponent } from './draganddrop-doc.component';
import { DraganddropCegComponent } from './draganddrop-ceg/draganddrop-ceg.component';
import { DraganddropDragoverCegComponent } from './draganddrop-dragover-ceg/draganddrop-dragover-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [DraganddropDocComponent, DraganddropCegComponent, DraganddropDragoverCegComponent],
  imports: [SharedDocumentationModule],
})
export class DraganddropDocModule {}
