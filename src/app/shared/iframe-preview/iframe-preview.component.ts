import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-iframe-preview',
  templateUrl: './iframe-preview.component.html',
  styleUrls: ['./iframe-preview.component.scss']
})
export class IframePreviewComponent implements AfterViewInit {
  @Input() code = '';
  @ViewChild('preview') preview;

  ngAfterViewInit(): void {
    this.createMobilePreview();
  }

  createMobilePreview(): void {
    const doc = this.preview.nativeElement.contentWindow.document;
    doc.open();
    doc.write(`<html><head>
    ${window.document.head.innerHTML}
    </head><body><div id="height">${this.code}<div></body></html>`);
    doc.close();
    const contentHeight = window.getComputedStyle(doc.getElementById('height')).height;
    this.preview.nativeElement.style.height = `${contentHeight}`;
  }

}
