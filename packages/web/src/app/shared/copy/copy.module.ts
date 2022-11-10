import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyComponent } from './copy.component';
import '@elvia/elvis-tooltip';

@NgModule({
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CopyComponent],
  declarations: [CopyComponent],
})
export class CopyModule {}
