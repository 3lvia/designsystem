import { Component } from '@angular/core';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { NgFor, NgClass } from '@angular/common';
import { ThumbnailSelectedCegComponent } from './thumbnail-selected-ceg/thumbnail-selected-ceg.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ThumbnailCegComponent } from './thumbnail-ceg/thumbnail-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-thumbnail-doc',
  templateUrl: './thumbnail-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    ThumbnailCegComponent,
    ComponentSectionComponent,
    ThumbnailSelectedCegComponent,
    NgFor,
    NgClass,
    ComponentSubsectionComponent,
  ],
})
export class ThumbnailDocComponent {
  selectedImage = 'assets/thumbnail/image-3.jpg';
  images = [
    { src: 'assets/thumbnail/image-3.jpg' },
    { src: 'assets/thumbnail/image-1.jpg' },
    { src: 'assets/thumbnail/image-2.jpg' },
    { src: 'assets/thumbnail/image-4.jpg' },
  ];
}
