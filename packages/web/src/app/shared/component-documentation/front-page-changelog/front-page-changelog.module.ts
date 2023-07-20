import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FrontPageChangelogComponent } from './front-page-changelog.component';
import { ChangelogTypePipe } from './front-page-changelog-pipe';
import { ChangelogIdPipe } from './front-page-changelog-id-pipe';
import { ComponentDocumentationDatePipe } from '../component-documentation-date-pipe';
import '@elvia/elvis-accordion';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ComponentDocumentationDatePipe],
  declarations: [FrontPageChangelogComponent, ChangelogTypePipe, ChangelogIdPipe],
  exports: [FrontPageChangelogComponent, ChangelogTypePipe, ChangelogIdPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FrontPageChangelogModule {}
