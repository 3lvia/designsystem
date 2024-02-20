import { Component } from '@angular/core';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { Title } from '@angular/platform-browser';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CodeViewerComponent } from '../../../shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { ColorTokenTableComponent } from './color-token-table/color-token-table.component';
import { ThemeTokenIllustrationComponent } from './illustrations/theme-token-illustration/theme-token-illustration.component';
import { PurposeTokenIllustrationComponent } from './illustrations/purpose-token-illustration/purpose-token-illustration.component';
import { DoDontTextComponent } from '../../../shared/do-dont-text/do-dont-text.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { NgIf } from '@angular/common';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ColorPickerComponent,
    ComponentSectionComponent,
    NgIf,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    DoDontTextComponent,
    PurposeTokenIllustrationComponent,
    ThemeTokenIllustrationComponent,
    ColorTokenTableComponent,
    CodeViewerComponent,
  ],
})
export class ColorComponent {
  purposeTokenExample = `.container {
  color: var(--e-color-text-1);
  background: var(--e-color-background-1);  
  border-color: var(--e-color-border-1);  
  &::hover {
    background: var(--e-color-background-hover-1);
    color: var(--e-color-background-hover-1--contrast)
  }
}`;

  baseTokenExample = `:root,
.e-theme-light {
  --container-color-border: var(--e-light-theme-grey-10);
}
.e-theme-dark,
.e-color-background-3 {
  --container-color-border: var(--e-dark-theme-grey-20);
}
.container {
  border-color: var(--container-color-border);
}`;

  classTokenExample = `<div class='e-color-background-1'>
  A container with text that follow the background-1 color contrast.   
  <span class='e-color-text-2'>
     Some kind of subtext with the e-color-text-2 color.
  </span>
</div>`;
  description = getDocPagesNotFromCMS('color')?.description;
  descriptionNo = getDocPagesNotFromCMS('color')?.descriptionNo;
  locale: Locale = 'en-GB';
  title = getDocPagesNotFromCMS('color')?.title;
  titleNo = getDocPagesNotFromCMS('color')?.titleNo;

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
