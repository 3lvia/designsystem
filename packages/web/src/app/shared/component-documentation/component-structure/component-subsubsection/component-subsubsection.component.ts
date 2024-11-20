import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-subsubsection',
  templateUrl: './component-subsubsection.component.html',
  styleUrls: ['./component-subsubsection.component.scss'],
  imports: [],
})
export class ComponentSubsubsectionComponent {
  @Input() sectionTitle = '';
  @Input() figmaOnly = false;
}
