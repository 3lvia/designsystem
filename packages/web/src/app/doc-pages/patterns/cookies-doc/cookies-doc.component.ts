import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('cookies');
@Component({
  selector: 'app-cookies-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, RouterLink],
  templateUrl: './cookies-doc.component.html',
})
export class CookiesDocComponent {
  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
