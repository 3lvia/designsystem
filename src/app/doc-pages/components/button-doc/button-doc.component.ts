import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss']
})
export class ButtonDocComponent implements OnInit {

  htmlCode = `
  <button class="elvis-button">Standard</button>
  <button class="elvis-button" disabled>Disabled</button>
  `;

  constructor() { }

  ngOnInit() {
  }

}
