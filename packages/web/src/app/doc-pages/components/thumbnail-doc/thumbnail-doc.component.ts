import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-thumbnail-doc',
  templateUrl: './thumbnail-doc.component.html',
})
export class ThumbnailDocComponent {
  figmaUrl = getComponent('thumbnail')?.figmaUrl;
  description = getComponent('thumbnail')?.description;
  title = getComponent('thumbnail')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  thumbnailExample = `<!--NB! This code is simplified to only include the CSS we provide.-->
<button
  class="e-thumbnail"
  [ngClass]="{ 'e-thumbnail---selected': image === selectedImage }"
  aria-label="Thumbnail button that opens the image in a larger view"
>
  <img src="assets/thumbnail/image.jpg" alt="Thumbnail example image" />
</button>
`;

  selectedImage = 'assets/thumbnail/image-3.JPG';
  images = [
    { src: 'assets/thumbnail/image-3.JPG' },
    { src: 'assets/thumbnail/image-1.JPG' },
    { src: 'assets/thumbnail/image-2.JPG' },
    { src: 'assets/thumbnail/image.JPG' },
  ];
}
