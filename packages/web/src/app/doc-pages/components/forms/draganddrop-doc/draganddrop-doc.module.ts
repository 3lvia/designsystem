import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { DraganddropDocComponent } from './draganddrop-doc.component';
import { DraganddropCegComponent } from './draganddrop-ceg/draganddrop-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { DraganddropDragoverCegComponent } from './draganddrop-dragover-ceg/draganddrop-dragover-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [DraganddropDocComponent, DraganddropCegComponent, DraganddropDragoverCegComponent],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentChangelogModule,
    CegModule,
    SharedDocumentationModule,
  ],
})
export class DraganddropDocModule {}
