import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-smartphone',
  templateUrl: './smartphone.component.html',
  styleUrls: ['./smartphone.component.scss']
})
export class SmartphoneComponent implements AfterViewInit {
  @Input() code = '';
  @Input() screenSize = 'desktop';
  @ViewChild('iframe') iframe;
  now = new Date();

  constructor() { }

  ngAfterViewInit() {
    console.log(this.screenSize);
    this.createIframe();
  }

  createIframe() {
    const doc = this.iframe.nativeElement.contentWindow.document;
    doc.open();
    doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="padding:1rem 2px;">${this.code}</body></html>`);
    doc.close();
  }

}
