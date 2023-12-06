import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowDocComponent } from './shadow-doc.component';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { ComponentChangelogComponent } from 'src/app/shared/component-documentation/component-changelog/component-changelog.component';
import { ShadowViewerComponent } from './shadow-viewer/shadow-viewer.component';
import '@elvia/elvis-icon';
import '@elvia/elvis-segmented-control';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    CopyModule,
    ComponentChangelogComponent,
  ],
  declarations: [ShadowDocComponent, ShadowViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShadowDocModule {}
