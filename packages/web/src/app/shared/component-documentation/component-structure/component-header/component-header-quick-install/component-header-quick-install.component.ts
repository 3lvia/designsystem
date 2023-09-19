import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { InstallLink } from 'src/app/shared/shared.interface';

@Component({
  selector: 'app-component-header-quick-install',
  templateUrl: './component-header-quick-install.component.html',
  styleUrls: ['./component-header-quick-install.component.scss'],
  standalone: true,
  imports: [CommonModule, CopyModule],
})
export class ComponentHeaderQuickInstallComponent {
  @Input() installLinks?: InstallLink;
}
