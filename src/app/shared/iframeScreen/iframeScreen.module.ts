import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeScreenComponent } from './iframeScreen.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [IframeScreenComponent],
  exports: [IframeScreenComponent]
})
export class IframeScreenModule { }
