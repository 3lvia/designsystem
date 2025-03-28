import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('forms');
@Component({
  selector: 'app-forms-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, ComponentSubsectionComponent, RouterLink],
  templateUrl: './forms-doc.component.html',
})
export class FormsDocComponent {
  protected theme = inject(ThemeService).themeSignal;

  title = docPage.title;
  description = docPage.description;
}
