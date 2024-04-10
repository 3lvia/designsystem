import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { TypographyArticleExampleComponent } from './typography-article-example/typography-article-example.component';
import { TypographyExampleExhibitComponent } from './typography-example-exhibit/typography-example-exhibit.component';
import { TypographyFontExampleComponent } from './typography-font-example/typography-font-example.component';
import { TypographyOutlineExampleComponent } from './typography-outline-example/typography-outline-example.component';
import { TypographyTitleExampleComponent } from './typography-title-example/typography-title-example.component';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  standalone: true,
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
  ],
})
export class TypographyDocComponent {
  title = getDocPagesNotFromCMS('typography')?.title;
  titleNo = getDocPagesNotFromCMS('typography')?.titleNo;
  description = getDocPagesNotFromCMS('typography')?.description;
  descriptionNo = getDocPagesNotFromCMS('typography')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('typography')?.figmaUrl;
  locale: Locale = 'en-GB';

  constructor(
    private titleService: Title,
    private localizationService: LocalizationService,
  ) {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
        this.titleService.setTitle(
          ((this.locale === 'nb-NO' && this.titleNo) || this.title) + ' | Elvia design system',
        );
      });
  }
}
