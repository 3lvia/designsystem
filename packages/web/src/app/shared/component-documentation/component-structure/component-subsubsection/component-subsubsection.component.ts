import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-subsubsection',
  templateUrl: './component-subsubsection.component.html',
  imports: [],
})
export class ComponentSubsubsectionComponent {
  @Input() sectionTitle = '';
  @Input() figmaOnly = false;
}
