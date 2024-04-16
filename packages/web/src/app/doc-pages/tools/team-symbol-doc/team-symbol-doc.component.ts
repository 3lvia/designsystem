import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { TeamSymbolGeneratorComponent } from './team-symbol-generator/team-symbol-generator.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-team-symbol-doc',
  templateUrl: './team-symbol-doc.component.html',
  styleUrls: ['./team-symbol-doc.component.scss'],
  standalone: true,
  imports: [ComponentHeaderComponent, ComponentSectionComponent, TeamSymbolGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeamSymbolDocComponent {
  description = getDocPagesNotFromCMS('team-symbol')?.description;
  title = getDocPagesNotFromCMS('team-symbol')?.title;

  constructor() {}
}
