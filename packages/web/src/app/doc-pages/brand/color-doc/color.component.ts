import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { CodeViewerComponent } from '../../../shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { DoDontTextComponent } from '../../../shared/do-dont-text/do-dont-text.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorShadeIllustrationComponent } from './color-shade-illustration/color-shade-illustration.component';
import { ColorTokenTableComponent } from './color-token-table/color-token-table.component';
import { PurposeTokenIllustrationComponent } from './illustrations/purpose-token-illustration/purpose-token-illustration.component';
import { ThemeTokenIllustrationComponent } from './illustrations/theme-token-illustration/theme-token-illustration.component';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('color');
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ColorPickerComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    DoDontTextComponent,
    PurposeTokenIllustrationComponent,
    ThemeTokenIllustrationComponent,
    ColorShadeIllustrationComponent,
    ColorTokenTableComponent,
    CodeViewerComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  description = docPage.description;
  descriptionNo = docPage.descriptionNo;
  locale: Locale = 'en-GB';
  title = docPage.title;
  titleNo = docPage.titleNo;

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
