import { Component } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // @ts-ignore
  version = require('../../../../style/elvis/package.json').version;

  constructor(private _globals: GlobalService) {}

  removeWarning() {
    this._globals.headerWarning.show = false;
  }

  showWarning() {
    return this._globals.headerWarning.show;
  }

  removableWarning() {
    return this._globals.headerWarning.closable;
  }
  

}
