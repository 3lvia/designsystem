import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CSSLibraryDocComponent } from './css-library-doc.component';
import { SharedDocumentationModule } from '../../../shared/component-documentation/shared-component-documentation.module';
import { CssLibraryIllustrationComponent } from './css-library-illustration/css-library-illustration.component';

@NgModule({
    imports: [CommonModule, SharedDocumentationModule, CSSLibraryDocComponent, CssLibraryIllustrationComponent],
    exports: [CSSLibraryDocComponent],
})
export class CssLibraryDocModule {}
