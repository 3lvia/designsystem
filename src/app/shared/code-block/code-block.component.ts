import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown]
})


export class CodeBlockComponent implements AfterViewInit {
  @ViewChild('preview') preview;
  @Input() title = '';
  @Input() description = '';
  @Input() does = '';
  @Input() donts = '';
  @Input() isTS = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;
  @Input() code = '';

  showCode = false;

  constructor() {}

  ngAfterViewInit() {
    this.preview.nativeElement.innerHTML = this.code;
  }

  changeShowCodeStatus() {
    this.showCode = !this.showCode;
  }
}
