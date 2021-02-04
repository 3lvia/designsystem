import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDocComponent } from './file-upload-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/component-documentation/component-example/code-block/code-block.module';
import { DndDirective } from './dnd.directive';
import { CodeHighlighterModule } from 'src/app/shared/component-documentation/component-example/code-highlighter/code-highlighter.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CodeHighlighterModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
  ],
  declarations: [FileUploadDocComponent, DndDirective],
})
export class FileUploadDocModule {}
