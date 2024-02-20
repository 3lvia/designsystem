import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LayoutMarginsCegComponent } from './layout-margins-ceg/layout-margins-ceg.component';
import { LayoutGuttersNoCegComponent } from './layout-gutters-no-ceg/layout-gutters-no-ceg.component';
import { LayoutGuttersCustomCegComponent } from './layout-gutters-custom-ceg/layout-gutters-custom-ceg.component';
import { LayoutGuttersCegComponent } from './layout-gutters-ceg/layout-gutters-ceg.component';
import { LayoutLevelsCegComponent } from './layout-levels-ceg/layout-levels-ceg.component';
import { LayoutOrderingCegComponent } from './layout-ordering-ceg/layout-ordering-ceg.component';
import { LayoutAlignmentCegComponent } from './layout-alignment-ceg/layout-alignment-ceg.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { LayoutBreakpointsCegComponent } from './layout-breakpoints-ceg/layout-breakpoints-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { NgIf } from '@angular/common';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';

@Component({
  selector: 'app-layout-doc',
  templateUrl: './layout-doc.component.html',
  styleUrls: ['./layout-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    NgIf,
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
    LayoutMarginsCegComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
