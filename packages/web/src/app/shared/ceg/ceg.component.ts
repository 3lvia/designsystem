import { AfterContentInit, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements AfterContentInit {
  @Input() componentData;

  componentPreviewCode: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {}

  ngAfterContentInit(): void {
    this.componentPreviewCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML);
    if (this.componentData.codeNativeScript) {
      setTimeout(() => eval(this.componentData.codeNativeScript), 1000);
    }
  }
}
