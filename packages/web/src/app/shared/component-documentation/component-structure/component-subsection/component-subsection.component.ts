import { Component, Input } from '@angular/core';
import { CopyComponent } from '../../../copy/copy.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-component-subsection',
  templateUrl: './component-subsection.component.html',
  styleUrls: ['./component-subsection.component.scss'],
  standalone: true,
  imports: [NgIf, CopyComponent],
})
export class ComponentSubsectionComponent {
  @Input() sectionTitle = '';
  @Input() propertiesClass = '';
  @Input() figmaOnly = false;
  @Input() sectionClass = '';
}
