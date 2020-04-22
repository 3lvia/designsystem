import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeScreenComponent } from './iframe-screen.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [IframeScreenComponent],
  exports: [IframeScreenComponent]
})
export class IframeScreenModule { }
