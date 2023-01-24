import { CUSTOM_ELEMENTS_SCHEMA, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentChangelogComponent } from './component-changelog.component';
import { ChangelogTypePipe } from './component-changelog-pipe';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';
import { ComponentDocumentationDatePipe } from '../component-documentation-date-pipe';

@NgModule({
  imports: [CommonModule, RouterModule, ComponentDocumentationDatePipe],
  declarations: [ComponentChangelogComponent, ChangelogTypePipe],
  exports: [ComponentChangelogComponent, ChangelogTypePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentChangelogModule {
  @Input() changelog;
}
