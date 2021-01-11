import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocComponent } from './list-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
  ],
  declarations: [ListDocComponent],
})
export class ListDocModule {}
