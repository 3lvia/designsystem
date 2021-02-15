import { Component, ViewChild, Renderer2 } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { componentData } from './tabs-data';

@Component({
  selector: 'app-tabs-doc',
  templateUrl: './tabs-doc.component.html',
  styleUrls: ['./tabs-doc.component.scss'],
})
export class TabsDocComponent {
  @ViewChild('cegFrame') cegFrame;

  componentData = componentData;
  figmaUrl = getComponent('tabs').figmaUrl;
  description = getComponent('tabs').description;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.cegFrame.nativeElement.insertAdjacentHTML('beforeend', this.componentData.codeWebComponent);
    this.renderer.insertBefore(this.cegFrame.nativeElement, 'insertAdjacentHTML', [
      'beforeend',
      this.componentData.codeWebComponent,
    ]);
  }
}
