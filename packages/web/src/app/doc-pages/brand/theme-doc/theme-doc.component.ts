import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

const docPage = getDocPage('theme');
@Component({
  selector: 'app-theme-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
    SafeHtmlPipe,
  ],
  templateUrl: './theme-doc.component.html',
})
export class ThemeDocComponent {
  docPage = docPage;
}
