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
      // tslint:disable-next-line:comment-format
      html: '<link href="https://unpkg.com/@elvia/elvis@latest/css/elvis-all.min.css" rel="stylesheet">' + this.code
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

