import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { TagDocComponent } from './tag-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { TagCegComponent } from './tag-ceg/tag-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { TagColoredCegComponent } from './tag-colored-ceg/tag-colored-ceg.component';

@NgModule({
  declarations: [TagDocComponent, TagCegComponent, TagColoredCegComponent],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class TagDocModule {}
