import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-smartphone',
  templateUrl: './smartphone.component.html',
  styleUrls: ['./smartphone.component.scss']
})
export class SmartphoneComponent implements AfterViewInit {
  @Input() code = '';
  @ViewChild('mobilepreview') mobilePreview;
  now = new Date();

  constructor() { }

  ngAfterViewInit() {
    this.createMobilePreview();
  }

  createMobilePreview() {
    const doc = this.mobilePreview.nativeElement.contentWindow.document;
    doc.open();
    doc.write(`<html><head>${window.document.head.innerHTML}</head><body style="padding:1rem;">${this.code}</body></html>`);
    doc.close();
  }

}
