import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ShadowViewerComponent } from './shadow-viewer/shadow-viewer.component';
import { doAndDont, styleText } from './texts';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('shadow');
@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  imports: [
    ComponentHeaderComponent,
    ShadowViewerComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentChangelogComponent,
  ],
})
export class ShadowDocComponent {
  private titleService = inject(Title);
  private localizationService = inject(LocalizationService);

  figmaUrl = docPage.figmaUrl;
  title = docPage.title;
  titleNo = docPage.titleNo;
  description = docPage.description;
  descriptionNo = docPage.descriptionNo;
  locale: Locale = 'en-GB';
  styleText = styleText;
  doDontText = doAndDont;

  constructor() {
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
