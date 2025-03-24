import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('ideation');
@Component({
  selector: 'app-ideation-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, AsyncPipe, RouterLink],
  templateUrl: './ideation-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdeationDocComponent {
  protected theme = inject(ThemeService).listenTheme();

  title = docPage.title;
  description = docPage.description;
}
