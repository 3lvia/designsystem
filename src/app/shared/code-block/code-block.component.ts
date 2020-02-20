import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'elvis-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit {

  @Input() 'isTS' = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;

  @Input() code = '';

  /* code = `
  <button class="elvis-button">Standard</button>
  <button class="elvis-button" disabled>Disabled</button>
  `;*/

  codepen = '';


  constructor() { }

  ngOnInit() {
    this.codepen = JSON.stringify({
      title: "Preview",
      html: this.code
    })
  }
}
