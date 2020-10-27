import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-draganddrop-doc',
  templateUrl: './draganddrop-doc.component.html',
  styleUrls: ['./draganddrop-doc.component.scss'],
})
export class DraganddropDocComponent {
  figmaUrl = getComponent('draganddrop').figmaUrl;
  description = getComponent('draganddrop').description;

  example1 = `<div class="e-dragdrop" style="width:300px; height:150px"></div>
`;

  example2 = `<div class="e-dragdrop e-dragdrop--dragover" style="width:300px; height:150px"></div>
`;
}
