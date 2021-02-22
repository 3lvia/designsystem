import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getComponent } from 'src/app/shared/e-items';
import { tabsData } from './tabs-data';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent {
  @ViewChild('safeHtml') safeHtml;
  exampleContents = exampleContents;
  componentData = tabsData;
  does = tabsData.does;
  donts = tabsData.donts;
  figmaUrl = getComponent('tabs').figmaUrl;
  description = getComponent('tabs').description;

  constructor(private sanitizer: DomSanitizer) {}

  // ngAfterViewInit(): void {
  //   this.safeHtml.nativeElement.insertAdjacentHTML(
  //     'beforeend',
  //     this.sanitizer.bypassSecurityTrustHtml(tabsData.codeWebComponent),
  //   );
  // }
}
