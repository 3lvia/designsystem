import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-carousel';
import { CarouselCegComponent } from './carousel-ceg/carousel-ceg.component';
import { CarouselDocComponent } from './carousel-doc.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';

@NgModule({
  imports: [
    CegModule,
    CommonModule,
    ComponentChangelogModule,
    ComponentHeaderModule,
    ComponentInstallationModule,
    ComponentPropertiesTableModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
  ],
  declarations: [CarouselDocComponent, CarouselCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselDocModule {}
