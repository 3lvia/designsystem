import { Component } from '@angular/core';

import { TeamSymbolGeneratorComponent } from './team-symbol-generator/team-symbol-generator.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('team-symbol');
@Component({
  selector: 'app-team-symbol-doc',
  templateUrl: './team-symbol-doc.component.html',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, TeamSymbolGeneratorComponent],
})
export class TeamSymbolDocComponent {
  description = docPage?.description;
  title = docPage?.title;
}
