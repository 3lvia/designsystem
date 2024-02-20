import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-subsubsection',
  templateUrl: './component-subsubsection.component.html',
  styleUrls: ['./component-subsubsection.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class ComponentSubsubsectionComponent {
  @Input() sectionTitle = '';
  @Input() figmaOnly = false;
}
