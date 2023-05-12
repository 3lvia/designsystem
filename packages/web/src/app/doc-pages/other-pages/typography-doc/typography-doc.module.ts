import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { TypographyAlignmentCegComponent } from './typography-alignment-ceg/typography-alignment-ceg.component';
import { TypographyBodyCegComponent } from './typography-body-ceg/typography-body-ceg.component';
import { TypographySpecialCegComponent } from './typography-special-ceg/typography-special-ceg.component';
import { TypographyTitlesCegComponent } from './typography-titles-ceg/typography-titles-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CegModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    ComponentChangelogModule,
  ],
  declarations: [
    TypographyDocComponent,
    TypographyAlignmentCegComponent,
    TypographyBodyCegComponent,
    TypographySpecialCegComponent,
    TypographyTitlesCegComponent,
  ],
})
export class TypographyDocModule {}
