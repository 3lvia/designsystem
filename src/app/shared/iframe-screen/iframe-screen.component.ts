import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe-screen',
  templateUrl: './iframe-screen.component.html',
  styleUrls: ['./iframe-screen.component.scss'],
})
export class IframeScreenComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('iframeDesktop') iframeDesktop;
  @ViewChild('iframeTablet') iframeTablet;
  @ViewChild('iframePhone') iframePhone;
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() screenSize = 'desktop';
  @Input() overwriteHeight: number;
  @Input() overwriteHeightTablet: number;
  @Input() overwriteHeightPhone: number;
  now = new Date();

  code = '';

  ngOnInit(): void {
    this.code = this.codeTS !== '' ? this.codeTS : (this.codeHTML !== '' ? this.codeHTML : this.codeCSS);
  }

  ngAfterViewInit(): void {
    this.createIframe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.codeTS && !changes.codeTS.firstChange) {
      this.code = this.codeTS;
      this.createIframe();
    } else if (changes.codeHTML && !changes.codeHTML.firstChange) {
      this.code = this.codeHTML;
      this.createIframe();
    } else if (changes.codeCSS && !changes.codeCSS.firstChange) {
      this.code = this.codeCSS;
      this.createIframe();
    }
  }

  createIframe(): void {
    this.code += '<script src="assets/js/elvis.js"></script>';
    if (this.screenSize === 'desktop') {
      const doc = this.iframeDesktop.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(
        `<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto;">${this.code}</div></body></html>`,
      );
      doc.close();
      this.iframeDesktop.nativeElement.style.height = doc.body.scrollHeight + 'px';
      if (this.overwriteHeight > 20) {
        this.iframeDesktop.nativeElement.style.height = this.overwriteHeight + 'px';
      }
    }
    if (this.screenSize === 'tablet') {
      const doc = this.iframeTablet.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(
        `<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto;">${this.code}</div></body></html>`,
      );
      doc.close();
      this.iframeTablet.nativeElement.style.height = '530px';
      if (this.overwriteHeightTablet > 20) {
        this.iframeTablet.nativeElement.style.height = this.overwriteHeightTablet + 'px';
      }
    }
    if (this.screenSize === 'phone') {
      const doc = this.iframePhone.nativeElement.contentWindow.document;
      doc.open();
      // tslint:disable-next-line:max-line-length
      doc.write(
        `<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto;">${this.code}</div></body></html>`,
      );
      doc.close();
      this.iframePhone.nativeElement.style.height = '530px';
      if (this.overwriteHeightPhone > 20) {
        this.iframePhone.nativeElement.style.height = this.overwriteHeightPhone + 'px';
      }
    }
  }
}
