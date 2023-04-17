import { Component, Input, OnInit } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

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
    this.packageName = 'elvis' + this.componentData.name.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
}
