import { Component, input } from '@angular/core';

import { CopyComponent } from '../../../copy/copy.component';

@Component({
  selector: 'app-component-subsection',
  templateUrl: './component-subsection.component.html',
  styleUrls: ['./component-subsection.component.scss'],
  imports: [CopyComponent],
})
export class ComponentSubsectionComponent {
  readonly sectionTitle = input('');
  readonly propertiesClass = input('');
  readonly figmaOnly = input(false);
  readonly sectionClass = input('');
}
