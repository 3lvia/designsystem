import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';

import { CopyComponent } from '../../copy/copy.component';
import { getPackageName } from './getPackageName';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';

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
  activeTabIndex = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    ? parseInt(localStorage.getItem(LANGUAGE_STORAGE_KEY)!)
    : 0;

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = getPackageName(this.componentData.name);
  }

  setActiveTab(newIndex: number): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newIndex.toString());
    this.activeTabIndex = newIndex;
  }
}
