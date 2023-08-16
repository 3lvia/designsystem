import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from '../../../shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ListDocComponent } from './list-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { BulletListCegComponent } from './list-bullet-ceg/list-bullet-ceg.component';
import { NumberedListCegComponent } from './list-numbered-ceg/list-numbered-ceg.component';
import { IconListCegComponent } from './list-icon-ceg/list-icon-ceg.component';
import { ListCegComponent } from './list-ceg/list-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    ListDocComponent,
    ListCegComponent,
    BulletListCegComponent,
    NumberedListCegComponent,
    IconListCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentChangelogModule,
    CegModule,
    SharedDocumentationModule,
  ],
})
export class ListDocModule {}
