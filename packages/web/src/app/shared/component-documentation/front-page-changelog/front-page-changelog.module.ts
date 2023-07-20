import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FrontPageChangelogComponent } from './front-page-changelog.component';
import { ComponentDocumentationDatePipe } from '../component-documentation-date-pipe';
import '@elvia/elvis-accordion';
import { FrontPageChangelogDatePipe } from './front-page-changelog-date-pipe';
import { FrontPageChangelogNamePipe } from './front-page-changelog-name-pipe';
import { FrontPageChangelogUrlPipe } from './front-page-changelog-url-pipe';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ComponentDocumentationDatePipe],
  declarations: [
    FrontPageChangelogComponent,
    FrontPageChangelogDatePipe,
    FrontPageChangelogNamePipe,
    FrontPageChangelogUrlPipe,
  ],
  exports: [
    FrontPageChangelogComponent,
    FrontPageChangelogDatePipe,
    FrontPageChangelogDatePipe,
    FrontPageChangelogUrlPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FrontPageChangelogModule {}
