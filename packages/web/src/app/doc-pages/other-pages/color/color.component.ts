import { Component } from '@angular/core';
import { LOCALE_CODE } from 'contentful/types';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { Title } from '@angular/platform-browser';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  description = getDocPagesNotFromCMS('color')?.description;
  descriptionNo = getDocPagesNotFromCMS('color')?.descriptionNo;
  locale: LOCALE_CODE = 'en-GB';
  title = getDocPagesNotFromCMS('color')?.title;
  titleNo = getDocPagesNotFromCMS('color')?.titleNo;

  constructor(private titleService: Title, private localizationService: LocalizationService) {
    this.setTabTitle();
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
        this.setTabTitle();
      });
  }

  setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };
}
