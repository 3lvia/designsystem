import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown]
})


export class CodeBlockComponent implements OnInit, AfterViewInit {
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
  codepen = '';

  constructor() {}

  ngOnInit() {
    this.codepen = JSON.stringify({
      title: 'Preview',
      html: `<head>
  <link rel="stylesheet" href="https://unpkg.com/@hafslundnett/elvis@0.0.2/css/elvis.min.css">
</head>
<body>` + this.code + `</body>`
    });
  }

  ngAfterViewInit() {
    this.preview.nativeElement.innerHTML = this.code;
  }

  showDesktop() {
    this.showSmartphone = false;
    this.preview.nativeElement.innerHTML = this.code;
  }
}

