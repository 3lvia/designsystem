import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})


export class CodeBlockComponent implements AfterViewInit {
  @ViewChild('preview') preview;
  @Input() title = '';
  @Input() isTS = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;

  @Input() code = '';

  constructor() {}

  ngAfterViewInit() {
    this.preview.nativeElement.innerHTML = this.code;
  }
}