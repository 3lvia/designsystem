import { Component, OnDestroy, OnInit } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { primaryColors, signalColors, dataColors, greysColors } from './color';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss'],
})
export class ColorDocComponent implements OnInit, OnDestroy {
  localizationSubscriber: Subscription;
  primaryColors = primaryColors;
  signalColors = signalColors;
  dataColors = dataColors;
  greysColors = greysColors;
  description = getDocPagesNotFromCMS('color')?.description;
  descriptionNo = getDocPagesNotFromCMS('color')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('color')?.figmaUrl;
  title = getDocPagesNotFromCMS('color')?.title;
  titleNo = getDocPagesNotFromCMS('color')?.titleNo;
  colors: string[] = ['red', 'green'];
  locale: LOCALE_CODE = 'en-GB';

  doCode = `<div class="e-bg-green"></div>`;
  dontCode = `<div class="e-bg-green e-text-grey"></div>`;
  doCodeCSS = `background: var(--e-green);
color: var(--e-red);`;
  dontCodeCSS = `background: var(--e-bg-green);
color: var(--e-text-red);`;

  constructor(private titleService: Title, private localizationService: LocalizationService) {}

  ngOnInit(): void {
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
}
