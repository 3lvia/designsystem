import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedDocComponent } from './get-started-doc.component';

import { RouterModule } from '@angular/router';

import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { CssLibraryIllustrationComponent } from './css-library-illustration/css-library-illustration.component';
import { WebComponentIllustrationComponent } from './web-component-illustration/web-component-illustration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CegModule,
    GetStartedDocComponent,
    CssLibraryIllustrationComponent,
    WebComponentIllustrationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GetStartedDocModule {}
