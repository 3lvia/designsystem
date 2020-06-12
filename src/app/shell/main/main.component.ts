import {Component} from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private globalService: GlobalService) {}

  visibleWarning(): boolean {
    return this.globalService.headerWarning.show;
  }
}
