import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss'],
})
export class TypographyDocComponent {
  localizationSubscriber: Subscription;
  loadedImg = false;
  typographyClasses = [];
  title = getDocPagesNotFromCMS('typography')?.title;
  titleNo = getDocPagesNotFromCMS('typography')?.titleNo;
  description = getDocPagesNotFromCMS('typography')?.description;
  descriptionNo = getDocPagesNotFromCMS('typography')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('typography')?.figmaUrl;
  locale: LOCALE_CODE = 'en-GB';

  isDesktop = true;
  isMobile = false;

  constructor(private titleService: Title, private localizationService: LocalizationService) {
    this.setTabTitle();
    this.localizationSubscriber = this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
        this.setTabTitle();
      });
  }

  private setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };

  hideContentLoader(evt: Event): void {
    if (evt?.target) {
      this.loadedImg = true;
    }
  }
}
