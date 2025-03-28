import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { DoDontTextComponent } from 'src/app/shared/do-dont-text/do-dont-text.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('accessibility');
@Component({
  selector: 'app-accessibility-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
    DoDontTextComponent,
    AsyncPipe,
  ],
  templateUrl: './accessibility-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccessibilityDocComponent {
  protected theme = inject(ThemeService).listenTheme();

  description = docPage.description ?? '';
  title = docPage.title;
}
