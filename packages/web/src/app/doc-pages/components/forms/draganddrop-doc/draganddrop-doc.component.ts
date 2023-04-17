import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-draganddrop-doc',
  templateUrl: './draganddrop-doc.component.html',
  styleUrls: ['./draganddrop-doc.component.scss'],
})
export class DraganddropDocComponent {
  figmaUrl = getComponent('drag-and-drop')?.figmaUrl;
  description = getComponent('drag-and-drop')?.description;
  title = getComponent('drag-and-drop')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  example1 = `<div class="e-dragdrop" style="width:300px; height:150px"></div>
`;

  example2 = `<div class="e-dragdrop e-dragdrop--dragover" style="width:300px; height:150px"></div>
`;
}
