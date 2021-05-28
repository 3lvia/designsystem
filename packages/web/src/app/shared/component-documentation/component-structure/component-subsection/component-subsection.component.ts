import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-subsection',
  templateUrl: './component-subsection.component.html',
  styleUrls: ['./component-subsection.component.scss'],
})
export class ComponentSubsectionComponent {
  @Input() sectionTitle = '';
  @Input() propertiesClass = '';
  @Input() figmaOnly = false;
  @Input() noAnimation = false;
}
