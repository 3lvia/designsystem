import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ShadowViewerComponent } from './shadow-viewer/shadow-viewer.component';
import { doAndDont, styleText } from './texts';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ShadowViewerComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    NgFor,
    ComponentChangelogComponent,
  ],
})
export class ShadowDocComponent {
  figmaUrl = getDocPagesNotFromCMS('shadow')?.figmaUrl;
  title = getDocPagesNotFromCMS('shadow')?.title;
  titleNo = getDocPagesNotFromCMS('shadow')?.titleNo;
  description = getDocPagesNotFromCMS('shadow')?.description;
  descriptionNo = getDocPagesNotFromCMS('shadow')?.descriptionNo;
  locale: Locale = 'en-GB';
  styleText = styleText;
  doDontText = doAndDont;

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
