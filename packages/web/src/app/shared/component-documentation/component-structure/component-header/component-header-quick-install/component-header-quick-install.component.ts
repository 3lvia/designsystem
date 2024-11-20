import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';

import { getPackageName } from '../../../component-installation/getPackageName';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

@Component({
  selector: 'app-component-header-quick-install',
  templateUrl: './component-header-quick-install.component.html',
  styleUrls: ['./component-header-quick-install.component.scss'],
  imports: [CopyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentHeaderQuickInstallComponent {
  @Input({ required: true }) componentData: ComponentData;

  get installLinks(): { npm: string; yarn: string } {
    const packageName = getPackageName(this.componentData.name);
    return { npm: `npm install ${packageName}`, yarn: `yarn add ${packageName}` };
  }
}
