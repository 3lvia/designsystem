import { OnInit, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent implements OnInit {
  @Input() componentData: ComponentData;

  componentPreviewCode: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateComponentPreview();
  }

  updateComponentPreview = () => {
    this.componentPreviewCode = this.domSanitizer.bypassSecurityTrustHtml(this.componentData.codeNativeHTML);
    setTimeout(() => eval(this.componentData.codeNativeScript), 1);
  };
}
