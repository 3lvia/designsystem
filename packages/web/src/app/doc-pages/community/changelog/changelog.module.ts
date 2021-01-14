import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, MarkdownModule.forRoot()],
  declarations: [ChangelogComponent],
})
export class ChangelogModule {}
