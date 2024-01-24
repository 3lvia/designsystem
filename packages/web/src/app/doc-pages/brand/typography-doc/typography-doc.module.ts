import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TypographyDocComponent } from './typography-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentChangelogComponent } from 'src/app/shared/component-documentation/component-changelog/component-changelog.component';
import { TypographyExampleExhibitComponent } from './typography-example-exhibit/typography-example-exhibit.component';
import { TypographyArticleExampleComponent } from './typography-article-example/typography-article-example.component';
import { TypographyTitleExampleComponent } from './typography-title-example/typography-title-example.component';
import { TypographyOutlineExampleComponent } from './typography-outline-example/typography-outline-example.component';
import { TypographyFontExampleComponent } from './typography-font-example/typography-font-example.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    ComponentChangelogComponent,
    RouterModule,
    TypographyExampleExhibitComponent,
    TypographyFontExampleComponent,
    TypographyTitleExampleComponent,
    TypographyOutlineExampleComponent,
    TypographyArticleExampleComponent,
  ],
  declarations: [TypographyDocComponent],
})
export class TypographyDocModule {}
