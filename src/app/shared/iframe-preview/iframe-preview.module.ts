import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframePreviewComponent } from './iframe-preview.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [IframePreviewComponent],
  exports: [IframePreviewComponent]
})
export class IframePreviewModule { }
