import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-iframe-screen',
  templateUrl: './iframe-screen.component.html',
  styleUrls: ['./iframe-screen.component.scss'],
})
export class IframeScreenComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('iframeDesktop') iframeDesktop: ElementRef<HTMLIFrameElement>;
  @ViewChild('iframePhone') iframePhone: ElementRef<HTMLIFrameElement>;
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() screenSize = 'desktop';
  @Input() overwriteHeight: number;
  now = new Date();

  code = '';

  ngOnInit(): void {
    if (this.codeTS !== '') {
      this.code = this.codeTS;
    } else if (this.codeHTML !== '') {
      this.code = this.codeHTML;
    } else {
      this.code = this.codeCSS;
    }
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
      const doc = this.iframeDesktop.nativeElement.contentWindow?.document;
      if (!doc) {
        return;
      }
      doc.open();
      doc.write(
        `<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto;">${this.code}</div></body></html>`,
      );
      doc.close();
      this.iframeDesktop.nativeElement.style.height = doc.body.scrollHeight + 'px';
      if (this.overwriteHeight > 20) {
        this.iframeDesktop.nativeElement.style.height = this.overwriteHeight + 'px';
      }
    }
    if (this.screenSize === 'phone') {
      const doc = this.iframePhone.nativeElement.contentWindow?.document;
      if (!doc) {
        return;
      }
      doc.open();
      doc.write(
        `<html><head>${window.document.head.innerHTML}</head><body><div style="overflow: auto;">${this.code}</div></body></html>`,
      );
      doc.close();
      this.iframePhone.nativeElement.style.height = '530px';
      if (this.overwriteHeight > 20) {
        this.iframePhone.nativeElement.style.height = this.overwriteHeight + 'px';
      }
    }
  }
}
