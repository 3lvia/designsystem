import { NgModule } from '@angular/core';
import { TagDocComponent } from './tag-doc.component';
import { TagCegComponent } from './tag-ceg/tag-ceg.component';
import { TagColoredCegComponent } from './tag-colored-ceg/tag-colored-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [TagDocComponent, TagCegComponent, TagColoredCegComponent],
  imports: [SharedDocumentationModule],
})
export class TagDocModule {}
