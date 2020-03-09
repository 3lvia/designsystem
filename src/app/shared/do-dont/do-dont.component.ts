import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-do-dont',
  templateUrl: './do-dont.component.html',
  styleUrls: ['./do-dont.component.scss']
})
export class DoDontComponent implements OnInit {

  @Input() isHTML = false;
  @Input() isTS = false;
  @Input() isSCSS = false;
  @Input() example = '';
  @Input() do = false;

  constructor() { }

  ngOnInit() {
  }

}
