import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, ComponentChangelogModule],
  declarations: [ChangelogComponent],
})
export class ChangelogModule {}
