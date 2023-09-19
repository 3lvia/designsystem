import { Component, Input, OnInit } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { InstallLink } from '../../shared.interface';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
})
export class ComponentInstallationComponent implements OnInit {
  @Input() componentData: ComponentData;
  @Input({ required: true }) installLinks: InstallLink;
  reactElementName: string;
  packageName: string;

  ngOnInit() {
    this.reactElementName = this.componentData.name;
    this.packageName = 'elvis' + this.componentData.name.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
}
