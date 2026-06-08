import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-component-subsubsection',
  templateUrl: './component-subsubsection.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class ComponentSubsubsectionComponent {
  readonly sectionTitle = input('');
  readonly figmaOnly = input(false);
}
