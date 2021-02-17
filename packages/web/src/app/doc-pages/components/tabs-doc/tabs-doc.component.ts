import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getComponent } from 'src/app/shared/e-items';
import { componentData } from './tabs-data';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent {
  @ViewChild('safeHtml') safeHtml;

  componentData = componentData;
  figmaUrl = getComponent('tabs').figmaUrl;
  description = getComponent('tabs').description;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.safeHtml.nativeElement.insertAdjacentHTML(
      'beforeend',
      this.sanitizer.bypassSecurityTrustHtml(this.componentData.codeWebComponent),
    );
  }
}
