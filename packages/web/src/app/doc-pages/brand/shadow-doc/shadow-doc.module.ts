import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowDocComponent } from './shadow-doc.component';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ShadowViewerComponent } from './shadow-viewer/shadow-viewer.component';
import { OldIllustrationComponent } from './old-illustration/old-illustration.component';
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
    ComponentChangelogModule,
  ],
  declarations: [ShadowDocComponent, ShadowViewerComponent, OldIllustrationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShadowDocModule {}
