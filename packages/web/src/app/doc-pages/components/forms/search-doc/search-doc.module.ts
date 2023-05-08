import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { SearchDocComponent } from './search-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { SearchCegComponent } from './search-ceg/search-ceg.component';
import { SearchInstantCegComponent } from './search-instant-ceg/search-instant-ceg.component';
import { SearchInstantSearchedCegComponent } from './search-instant-searched-ceg/search-instant-searched-ceg.component';
import { SearchOnSubmitCegComponent } from './search-on-submit-ceg/search-on-submit-ceg.component';
import { SearchOnSubmitSearchedCegComponent } from './search-on-submit-searched-ceg/search-on-submit-searched-ceg.component';
import { SearchFullwidthCegComponent } from './search-fullwidth-ceg/search-fullwidth-ceg.component';
import { SearchSizeNormalCegComponent } from './search-size-normal-ceg/search-size-normal-ceg.component';
import { SearchSizeCompactCegComponent } from './search-size-compact-ceg/search-size-compact-ceg.component';

@NgModule({
  declarations: [
    SearchDocComponent,
    SearchCegComponent,
    SearchInstantCegComponent,
    SearchInstantSearchedCegComponent,
    SearchOnSubmitCegComponent,
    SearchOnSubmitSearchedCegComponent,
    SearchFullwidthCegComponent,
    SearchSizeNormalCegComponent,
    SearchSizeCompactCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleV1Module,
    CegModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
  ],
})
export class SearchDocModule {}
