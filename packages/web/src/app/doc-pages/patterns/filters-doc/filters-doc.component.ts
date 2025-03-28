import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('filters');
@Component({
  selector: 'app-filters-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, RouterLink, ComponentSubsectionComponent],
  templateUrl: './filters-doc.component.html',
})
export class FiltersDocComponent {
  protected theme = inject(ThemeService).themeSignal;

  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
