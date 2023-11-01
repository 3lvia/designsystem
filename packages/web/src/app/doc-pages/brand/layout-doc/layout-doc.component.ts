import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
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
  locale: Locale = 'en-GB';
  egSelectedValue = 0;
  igSelectedValue = 0;

  constructor(
    private titleService: Title,
    private localizationService: LocalizationService,
  ) {
    this.setTabTitle();
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
        this.setTabTitle();
      });
  }

  setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };
}
