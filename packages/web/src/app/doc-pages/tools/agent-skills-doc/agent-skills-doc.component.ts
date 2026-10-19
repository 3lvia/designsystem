import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import { CodeViewerComponent } from 'src/app/shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('agent-skills');

@Component({
  selector: 'app-agent-skills-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, CodeViewerComponent],
  templateUrl: './agent-skills-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgentSkillsDocComponent {
  protected readonly title = docPage.title;
  protected readonly description = docPage.description;

  protected readonly githubInstall = 'gh skill install 3lvia/designsystem elvia-design-system';
  protected readonly skillsInstall = 'npx skills add 3lvia/designsystem --skill elvia-design-system';

  protected readonly githubUpdate = 'gh skill update elvia-design-system';
  protected readonly skillsUpdate = 'npx skills update elvia-design-system';
}
