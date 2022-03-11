import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-installation',
  templateUrl: './component-installation.component.html',
  styleUrls: ['./component-installation.component.scss'],
})
export class ComponentInstallationComponent {
  @Input() componentData;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ngOnInit() {
    console.log(this.componentData);
  }
}
