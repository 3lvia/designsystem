import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('comments');
@Component({
  selector: 'app-comments-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    RouterLink,
  ],
  templateUrl: './comments-doc.component.html',
})
export class CommentsDocComponent {
  protected theme = inject(ThemeService).themeSignal;

  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
