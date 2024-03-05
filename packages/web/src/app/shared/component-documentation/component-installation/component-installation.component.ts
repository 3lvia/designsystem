import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';

import { CopyComponent } from '../../copy/copy.component';
import { getPackageName } from './getPackageName';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
  standalone: true,
  imports: [CopyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentInstallationComponent implements OnInit {
  @Input() componentData: ComponentData;
  reactElementName: string;
  packageName: string;
  frameworkName: 'angular' | 'react' | 'vue' = 'angular';

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = getPackageName(this.componentData.name);
  }

  setFramework(activeTabIndex: number): void {
    switch (activeTabIndex) {
      case 1:
        this.frameworkName = 'react';
        break;
      case 2:
        this.frameworkName = 'vue';
        break;
      default:
        this.frameworkName = 'angular';
        break;
    }
  }
}
