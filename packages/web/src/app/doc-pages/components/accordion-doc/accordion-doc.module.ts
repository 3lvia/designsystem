import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDocComponent } from './accordion-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CodeBlockAccordionModule } from 'src/app/shared/code-block-accordion/code-block-accordion.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CodeHighlighterModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    CodeBlockAccordionModule,
  ],
  declarations: [AccordionDocComponent],
})
export class AccordionDocModule {}
