import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FrontPageChangelogComponent } from './front-page-changelog.component';
import { ComponentDocumentationDatePipe } from '../component-documentation-date-pipe';
import '@elvia/elvis-accordion';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ComponentDocumentationDatePipe],
  declarations: [FrontPageChangelogComponent],
  exports: [FrontPageChangelogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FrontPageChangelogModule {}
