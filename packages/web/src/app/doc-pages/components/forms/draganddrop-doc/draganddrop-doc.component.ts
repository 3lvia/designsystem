import { Component } from '@angular/core';
import { DraganddropDragoverCegComponent } from './draganddrop-dragover-ceg/draganddrop-dragover-ceg.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { DraganddropCegComponent } from './draganddrop-ceg/draganddrop-ceg.component';
import { StaticCegComponent } from '../../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-draganddrop-doc',
  templateUrl: './draganddrop-doc.component.html',
  styleUrls: ['./draganddrop-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    DraganddropCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    DraganddropDragoverCegComponent,
  ],
})
export class DraganddropDocComponent {}
