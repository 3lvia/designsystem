import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent implements OnInit {

  componentStatus = 'New';
  className = '.elvis-badge';

  constructor() { }

  ngOnInit() {
  }

}
