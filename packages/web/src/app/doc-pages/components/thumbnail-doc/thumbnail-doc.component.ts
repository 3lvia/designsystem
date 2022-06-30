import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-thumbnail-doc',
  templateUrl: './thumbnail-doc.component.html',
})
export class ThumbnailDocComponent {
  figmaUrl = getComponent('thumbnail').figmaUrl;
  description = getComponent('thumbnail').description;

  thumbnailExample = `<div class="e-flex e-gap-8">
  <button class="e-thumbnail e-thumbnail---selected">
    <img src="assets/thumbnail/image.png" alt="Thumbnail example image 1" />
  </button>
  <button class="e-thumbnail">
    <img src="assets/thumbnail/image-1.png" alt="Thumbnail example image 2" />
  </button>
  <button class="e-thumbnail">
    <img src="assets/thumbnail/image-2.png" alt="Thumbnail example image 3" />
  </button>
  <button class="e-thumbnail">
    <img src="assets/thumbnail/image-3.png" alt="Thumbnail example image 4" />
  </button>
</div>`;
}
