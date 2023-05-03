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

  selectedImage = 'assets/thumbnail/image-3.jpg';
  images = [
    { src: 'assets/thumbnail/image-3.jpg' },
    { src: 'assets/thumbnail/image-1.jpg' },
    { src: 'assets/thumbnail/image-2.jpg' },
    { src: 'assets/thumbnail/image.jpg' },
  ];
}
