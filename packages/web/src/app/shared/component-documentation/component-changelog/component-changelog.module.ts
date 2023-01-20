import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentChangelogComponent } from './component-changelog.component';
import { ChangelogTypePipe } from './component-changelog-pipe';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';
import { ChangelogIdPipe } from './component-changelog-id-pipe';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [ComponentChangelogComponent, ChangelogTypePipe, ChangelogIdPipe],
  exports: [ComponentChangelogComponent, ChangelogTypePipe, ChangelogIdPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentChangelogModule {}
