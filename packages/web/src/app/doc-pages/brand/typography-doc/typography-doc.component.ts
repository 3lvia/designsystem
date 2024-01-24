import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
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
