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
  @ViewChild('mobilepreview') mobilePreview;
  @Input() title = '';
  @Input() description = '';
  @Input() does = '';
  @Input() donts = '';
  @Input() isTS = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;
  @Input() code = '';

  showCode = false;
  showSmartphone = false;

  constructor() {}

  ngAfterViewInit() {
    this.preview.nativeElement.innerHTML = this.code;
  }
}

