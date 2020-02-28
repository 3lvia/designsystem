import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-do-dont',
  templateUrl: './do-dont.component.html',
  styleUrls: ['./do-dont.component.scss']
})
export class DoDontComponent implements OnInit {

  isHTML = true;

  @Input() example = '';
  @Input() do = false;

  constructor() { }

  ngOnInit() {
  }

}
