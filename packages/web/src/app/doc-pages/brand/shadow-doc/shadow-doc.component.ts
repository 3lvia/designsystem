import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { doAndDont, styleText } from './texts';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
})
export class ShadowDocComponent {
  figmaUrl = getDocPagesNotFromCMS('shadow')?.figmaUrl;
  title = getDocPagesNotFromCMS('shadow')?.title;
  titleNo = getDocPagesNotFromCMS('shadow')?.titleNo;
  description = getDocPagesNotFromCMS('shadow')?.description;
  descriptionNo = getDocPagesNotFromCMS('shadow')?.descriptionNo;
  locale: LOCALE_CODE = 'en-GB';
  styleText = styleText;
  doDontText = doAndDont;

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
