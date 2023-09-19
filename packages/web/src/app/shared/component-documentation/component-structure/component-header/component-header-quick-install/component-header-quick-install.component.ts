import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { getPackageName } from '../../../component-installation/getPackageName';

@Component({
  selector: 'app-component-header-quick-install',
  templateUrl: './component-header-quick-install.component.html',
  styleUrls: ['./component-header-quick-install.component.scss'],
  standalone: true,
  imports: [CommonModule, CopyModule],
})
export class ComponentHeaderQuickInstallComponent {
  @Input({ required: true }) componentData: ComponentData;

  get installLinks(): { npm: string; yarn: string } {
    const packageName = getPackageName(this.componentData.name);
    return { npm: `npm install ${packageName}`, yarn: `yarn add ${packageName}` };
  }
}
