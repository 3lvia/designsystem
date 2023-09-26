import { Component, Input, OnInit } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { getPackageName } from './getPackageName';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
})
export class ComponentInstallationComponent implements OnInit {
  @Input() componentData: ComponentData;
  reactElementName: string;
  packageName: string;

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = getPackageName(this.componentData.name);
  }
}
