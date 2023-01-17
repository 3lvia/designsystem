import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentChangelogComponent } from './component-changelog.component';
import { ChangelogTypePipe } from './component-changelog-pipe';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [ComponentChangelogComponent, ChangelogTypePipe],
  exports: [ComponentChangelogComponent, ChangelogTypePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentChangelogModule {}
