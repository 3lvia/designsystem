import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss']
})
export class ColorDocComponent implements OnInit {

  colors: string[] = ['red', 'green'];

  constructor() { }

  ngOnInit() {
  }


}
