import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('design-process');
@Component({
  selector: 'app-design-process-doc',
  imports: [
    AsyncPipe,
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
  ],
  templateUrl: './design-process-doc.component.html',
})
export class DesignProcessDocComponent {
  protected theme = inject(ThemeService).listenTheme();

  title = docPage.title;
  description = docPage.description;
}
