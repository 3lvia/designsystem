import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { LayoutAlignmentCegComponent } from './layout-alignment-ceg/layout-alignment-ceg.component';
import { LayoutBreakpointsCegComponent } from './layout-breakpoints-ceg/layout-breakpoints-ceg.component';
import { LayoutGuttersCegComponent } from './layout-gutters-ceg/layout-gutters-ceg.component';
import { LayoutGuttersCustomCegComponent } from './layout-gutters-custom-ceg/layout-gutters-custom-ceg.component';
import { LayoutGuttersNoCegComponent } from './layout-gutters-no-ceg/layout-gutters-no-ceg.component';
import { LayoutLevelsCegComponent } from './layout-levels-ceg/layout-levels-ceg.component';
import { LayoutOrderingCegComponent } from './layout-ordering-ceg/layout-ordering-ceg.component';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('layout');
@Component({
  selector: 'app-layout-doc',
  templateUrl: './layout-doc.component.html',
  styleUrls: ['./layout-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    StaticCegComponent,
    LayoutBreakpointsCegComponent,
    ComponentSubsubsectionComponent,
    LayoutAlignmentCegComponent,
    LayoutOrderingCegComponent,
    LayoutLevelsCegComponent,
    LayoutGuttersCegComponent,
    LayoutGuttersCustomCegComponent,
    LayoutGuttersNoCegComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutDocComponent {
  title = docPage.title;
  titleNo = docPage.titleNo;
  description = docPage.description;
  descriptionNo = docPage.descriptionNo;
  figmaUrl = docPage.figmaUrl;
  locale: Locale = 'en-GB';

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
