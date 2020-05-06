import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe-screen',
  templateUrl: './iframe-screen.component.html',
  styleUrls: ['./iframe-screen.component.scss']
})
export class IframeScreenComponent implements AfterViewInit {
  @ViewChild('iframeDesktop') iframeDesktop;
  @ViewChild('iframeTablet') iframeTablet;
  @ViewChild('iframePhone') iframePhone;
  @Input() code = '';
  @Input() screenSize = 'desktop';
  @Input() overwriteHeight: number;
  now = new Date();

  constructor() { }

  ngAfterViewInit() {
    this.createIframe();
  }


  createIframe() {
    this.code += '<script src="assets/js/icons-injector.js"></script>';

    if (this.screenSize === 'desktop') {
      const doc = this.iframeDesktop.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto; padding: 8px;">${this.code}</div></body></html>`);
      doc.close();
      this.iframeDesktop.nativeElement.style.height = (doc.body.scrollHeight + 20) + 'px';
      if (this.overwriteHeight > 20) {
        this.iframeDesktop.nativeElement.style.height = (this.overwriteHeight + 'px');
      }
    }
    if (this.screenSize === 'tablet') {
      const doc = this.iframeTablet.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto; padding: 4px;">${this.code}</div></body></html>`);
      doc.close();
      this.iframeTablet.nativeElement.style.height = '530px';
    }
    if (this.screenSize === 'phone') {
      const doc = this.iframePhone.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(`<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto; padding: 4px;">${this.code}</div></body></html>`);
      doc.close();
      this.iframePhone.nativeElement.style.height = '530px';
    }
  }
}
