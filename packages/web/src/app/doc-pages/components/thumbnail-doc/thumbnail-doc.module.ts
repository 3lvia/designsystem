import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ThumbnailDocComponent } from './thumbnail-doc.component';
import { ThumbnailCegComponent } from './thumbnail-ceg/thumbnail-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ThumbnailSelectedCegComponent } from './thumbnail-selected-ceg/thumbnail-selected-ceg.component';

@NgModule({
  declarations: [ThumbnailDocComponent, ThumbnailCegComponent, ThumbnailSelectedCegComponent],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class ThumbnailDocModule {}
