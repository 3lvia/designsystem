import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { TypographyExampleExhibitComponent } from './typography-example-exhibit/typography-example-exhibit.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CegModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    ComponentChangelogModule,
    RouterModule,
    TypographyExampleExhibitComponent,
  ],
  declarations: [TypographyDocComponent],
})
export class TypographyDocModule {}
