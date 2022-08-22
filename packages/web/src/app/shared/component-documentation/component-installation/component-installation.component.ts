import { Component, Input } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
  styleUrls: ['./component-installation.component.scss'],
})
export class ComponentInstallationComponent {
  @Input() componentData: ComponentData;
}
