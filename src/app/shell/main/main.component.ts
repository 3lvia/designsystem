import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

  visibleWarning() {
    return this.globalService.headerWarning.show;
  }

}
