import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent {
  @Input() componentData;

  dynamicCode: SafeHtml;
  controlTypeOrder = ['counter', 'radio', 'toggle', 'checkbox'];

  constructor(private domSanitizer: DomSanitizer) {}

  ngAfterContentInit(): void {
    this.dynamicCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML);
    if (this.componentData.codeNativeScript) {
      setTimeout(() => eval(this.componentData.codeNativeScript), 1000);
    }
  }
}
