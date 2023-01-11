import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePreviewComponent } from './code-preview.component';
import '@elvia/elvis-tabs';
import { CopyModule } from '../../copy/copy.module';

@NgModule({
  imports: [CommonModule, CopyModule],
  declarations: [CodePreviewComponent],
  exports: [CodePreviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CodePreviewModule {}
