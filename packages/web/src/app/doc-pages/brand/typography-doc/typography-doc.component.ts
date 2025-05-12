import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { AbbreviationExampleCegComponent } from './abbreviation-example-ceg/abbreviation-example-ceg.component';
import { TypographyArticleExampleComponent } from './typography-article-example/typography-article-example.component';
import { TypographyExampleExhibitComponent } from './typography-example-exhibit/typography-example-exhibit.component';
import { TypographyFontExampleComponent } from './typography-font-example/typography-font-example.component';
import { TypographyOutlineExampleComponent } from './typography-outline-example/typography-outline-example.component';
import { TypographyTitleExampleComponent } from './typography-title-example/typography-title-example.component';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { StaticCegComponent } from 'src/app/shared/component-documentation/ceg';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('typography');
@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  imports: [
    ComponentHeaderComponent,
    ComponentSubsectionComponent,
    TypographyExampleExhibitComponent,
    ComponentSectionComponent,
    TypographyFontExampleComponent,
    TypographyTitleExampleComponent,
    TypographyOutlineExampleComponent,
    TypographyArticleExampleComponent,
    RouterLink,
    ComponentChangelogComponent,
    StaticCegComponent,
    AbbreviationExampleCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypographyDocComponent {
  private localizationService = inject(LocalizationService);

  title = docPage.title;
  titleNo = docPage.titleNo;
  description = docPage.description;
  descriptionNo = docPage.descriptionNo;
  figmaUrl = docPage.figmaUrl;
  locale: Locale = 'en-GB';

  constructor() {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
      });
  }
}
