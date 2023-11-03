import { Component, Input, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
})
export class ComponentHeaderComponent {
  @Input() figmaUrl?: string;
  @Input() lastUpdated?: string;
  @Input() componentData?: ComponentData;
  @Input({ transform: booleanAttribute }) showCssLibraryTag = false;
}
