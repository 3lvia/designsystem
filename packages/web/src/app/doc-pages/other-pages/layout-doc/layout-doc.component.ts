import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { spacingItems } from './spacing';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout-doc',
  templateUrl: './layout-doc.component.html',
  styleUrls: ['./layout-doc.component.scss'],
})
export class LayoutDocComponent {
  title = getDocPagesNotFromCMS('layout')?.title;
  titleNo = getDocPagesNotFromCMS('layout')?.titleNo;
  description = getDocPagesNotFromCMS('layout')?.description;
  descriptionNo = getDocPagesNotFromCMS('layout')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('layout')?.figmaUrl;
  spacingItems = spacingItems;
  locale: LOCALE_CODE = 'en-GB';

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

  doCodeCSS = `padding: var(--e-spacing-16);
  margin: var(--e-spacing-48);`;
  dontCodeCSS = `padding: var(--e-p-16);
  margin:  var(--e-m-48);`;

  egSelectedValue = 0;
  igSelectedValue = 0;
}
