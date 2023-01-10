import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CegComponent } from './ceg.component';
import '@elvia/elvis-accordion';
import '@elvia/elvis-popover';
import { CodePreviewModule } from './code-preview/code-preview.module';

@NgModule({
  imports: [CommonModule, CodePreviewModule],
  declarations: [CegComponent],
  exports: [CegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CegModule {}
