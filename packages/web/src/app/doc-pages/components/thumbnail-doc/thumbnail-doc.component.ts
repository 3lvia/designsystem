import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-thumbnail-doc',
  templateUrl: './thumbnail-doc.component.html',
  styleUrls: ['./thumbnail-doc.component.scss'],
})
export class ThumbnailDocComponent {
  figmaUrl = getComponent('thumbnail').figmaUrl;
  description = getComponent('thumbnail').description;
}
