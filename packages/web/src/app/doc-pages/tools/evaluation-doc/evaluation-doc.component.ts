import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('evaluation');
@Component({
  selector: 'app-evaluation-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, AsyncPipe],
  templateUrl: './evaluation-doc.component.html',
})
export class EvaluationDocComponent {
  protected theme = inject(ThemeService).listenTheme();

  title = docPage.title;
  description = docPage.description;
}
