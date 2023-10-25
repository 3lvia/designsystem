import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CSSLibraryDocComponent } from './css-library-doc.component';
import { SharedDocumentationModule } from '../../../shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [CSSLibraryDocComponent],
  imports: [CommonModule, SharedDocumentationModule],
  exports: [CSSLibraryDocComponent],
})
export class CssLibraryDocModule {}
