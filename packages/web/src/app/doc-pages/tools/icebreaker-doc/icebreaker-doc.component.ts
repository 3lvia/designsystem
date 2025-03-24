import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('icebreakers');
@Component({
  selector: 'app-icebreaker-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, AsyncPipe],
  templateUrl: './icebreaker-doc.component.html',
})
export class IcebreakerDocComponent {
  protected theme = inject(ThemeService).listenTheme();

  title = docPage.title;
  description = docPage.description;
}
