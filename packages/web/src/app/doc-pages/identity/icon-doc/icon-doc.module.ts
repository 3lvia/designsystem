import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDocComponent } from './icon-doc.component';
import { CodeBlockModule } from 'src/app/shared/component-documentation/component-example/code-block/code-block.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IconSearchPipe } from './icon-search.pipe';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { CodeHighlighterModule } from 'src/app/shared/component-documentation/component-example/code-highlighter/code-highlighter.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CodeBlockModule,
    FormsModule,
    ComponentHeaderModule,
    CopyModule,
    ComponentPropertiesModule,
    CodeHighlighterModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    CopyModule,
    RouterModule,
  ],
  declarations: [IconDocComponent, IconSearchPipe],
})
export class IconDocModule {}
