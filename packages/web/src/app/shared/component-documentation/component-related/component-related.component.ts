import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-related',
  templateUrl: './component-related.component.html',
  styleUrls: ['./component-related.component.scss'],
})
export class ComponentRelatedComponent {
  @Input() relatedComponents: any[];
}
