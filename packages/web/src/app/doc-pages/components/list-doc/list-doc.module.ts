import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from '../../../shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ListDocComponent } from './list-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from '../../../shared/component-documentation/ceg/ceg.module';
import { BulletListCegComponent } from './bullet-list-ceg/bullet-list-ceg.component';
import { NumberedListCegComponent } from './numbered-list-ceg/numbered-list-ceg.component';
import { IconListCegComponent } from './icon-list-ceg/icon-list-ceg.component';
import { ListCegComponent } from './list-ceg/list-ceg.component';

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
    ComponentExampleV1Module,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class ListDocModule {}
