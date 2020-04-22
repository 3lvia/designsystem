import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe-screen',
  templateUrl: './iframe-screen.component.html',
  styleUrls: ['./iframe-screen.component.scss']
})
export class IframeScreenComponent implements AfterViewInit {
  @Input() code = '';
  @Input() screenSize = 'desktop';
  @ViewChild('iframeDesktop') iframeDesktop;
  @ViewChild('iframeTablet') iframeTablet;
  @ViewChild('iframePhone') iframePhone;
  now = new Date();

  constructor() { }

  ngAfterViewInit() {
    this.createIframe();
  }


  createIframe() {
    if (this.screenSize === 'desktop') {
      const doc = this.iframeDesktop.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="overflow: auto;">${this.code}</body></html>`);
      doc.close();
      this.iframeDesktop.nativeElement.style.height = (doc.body.scrollHeight + 20) + 'px';
    }
    if (this.screenSize === 'tablet') {
      const doc = this.iframeTablet.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="overflow: auto;">${this.code}</body></html>`);
      doc.close();
      this.iframeTablet.nativeElement.style.height = '470px';
    }
    if (this.screenSize === 'phone') {
      const doc = this.iframePhone.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="overflow: auto;">${this.code}</body></html>`);
      doc.close();
      this.iframePhone.nativeElement.style.height = '470px';
    }
  }
}
