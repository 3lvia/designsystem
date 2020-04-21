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
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="padding:16px 8px; overflow: auto;">${this.code}</body></html>`);
      doc.close();
      const contentHeight = (doc.body.scrollHeight + 20) + 'px'; // 20px for extra height padding
      this.iframeDesktop.nativeElement.style.height = `${contentHeight}`;
    }
    if (this.screenSize === 'tablet') {
      const doc = this.iframeTablet.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="padding:4px; overflow: auto;">${this.code}</body></html>`);
      doc.close();
      const contentHeight = window.getComputedStyle(doc.body).height;
      this.iframeTablet.nativeElement.style.height = `${contentHeight}`;
    }
    if (this.screenSize === 'phone') {
      const doc = this.iframePhone.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="padding:4px; overflow: auto;">${this.code}</body></html>`);
      doc.close();
      const contentHeight = window.getComputedStyle(doc.body).height;
      this.iframePhone.nativeElement.style.height = `${contentHeight}`;
    }
  }
}
