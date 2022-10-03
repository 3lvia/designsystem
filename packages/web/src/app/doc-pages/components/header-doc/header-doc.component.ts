import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { GlobalService } from 'src/app/core/services/global.service';
import { headerData } from './header-data';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
})
export class HeaderDocComponent {
  componentData = headerData;
  internalHeader = false;
  figmaUrl = getComponent('header').figmaUrl;
  description = getComponent('header').description;

  internalHeaderExample = `<elvia-header>
</elvia-header>
`;

  constructor(private globalService: GlobalService) {}

  testInternalHeader(): void {
    this.globalService.toggleShowInternalHeader(true);
    this.internalHeader = true;
  }
  hideInternalHeader(): void {
    this.globalService.toggleShowInternalHeader(false);
    this.internalHeader = false;
  }
}
