import {Component} from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  version = require('../../../../style/elvis/package.json').version;

  constructor(private _globals: GlobalService) {}

  removeWarning(): void {
    this._globals.headerWarning.show = false;
  }

  showWarning(): boolean {
    return this._globals.headerWarning.show;
  }

  removableWarning(): boolean {
    return this._globals.headerWarning.closable;
  }
}
