import { Component } from '@angular/core';

@Component({
  selector: 'app-thumbnail-doc',
  templateUrl: './thumbnail-doc.component.html',
})
export class ThumbnailDocComponent {
  selectedImage = 'assets/thumbnail/image-3.jpg';
  images = [
    { src: 'assets/thumbnail/image-3.jpg' },
    { src: 'assets/thumbnail/image-1.jpg' },
    { src: 'assets/thumbnail/image-2.jpg' },
    { src: 'assets/thumbnail/image.jpg' },
  ];
}
