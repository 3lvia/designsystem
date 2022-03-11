import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogComponent } from './component-changelog.component';
import { CopyModule } from '../../copy/copy.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [CommonModule, CopyModule, MarkdownModule.forRoot()],
  declarations: [ComponentChangelogComponent],
  exports: [ComponentChangelogComponent],
})
export class ComponentChangelogModule {
  @Input() componentData;
}
