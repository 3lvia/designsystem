import { Component, OnDestroy } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { spacingItems } from './spacing';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { Subscription } from 'rxjs';
import { LOCALE_CODE } from 'contentful/types';

@Component({
  selector: 'app-layout-doc',
  templateUrl: './layout-doc.component.html',
  styleUrls: ['./layout-doc.component.scss'],
})
export class LayoutDocComponent implements OnDestroy {
  localizationSubscriber: Subscription;
  title = getDocPagesNotFromCMS('layout')?.title;
  titleNo = getDocPagesNotFromCMS('layout')?.titleNo;
  description = getDocPagesNotFromCMS('layout')?.description;
  descriptionNo = getDocPagesNotFromCMS('layout')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('layout')?.figmaUrl;
  spacingItems = spacingItems;
  locale: LOCALE_CODE = 'en-GB';

  constructor(private titleService: Title, private localizationService: LocalizationService) {
    this.setTabTitle();
    this.localizationSubscriber = this.localizationService.listenLocalization().subscribe((locale) => {
      this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
      this.setTabTitle();
    });
  }

  ngOnDestroy(): void {
    this.localizationSubscriber && this.localizationSubscriber.unsubscribe();
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
