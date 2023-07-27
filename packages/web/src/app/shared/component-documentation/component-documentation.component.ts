import { Component, Input, booleanAttribute } from '@angular/core';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';
import data from '@elvia/elvis/.internal/classlist.json';

@Component({
  selector: 'app-component-documentation',
  templateUrl: './component-documentation.component.html',
  styleUrls: ['./component-documentation.component.scss'],
})
export class ComponentDocumentationComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() figmaUrl: string;
  @Input({ transform: booleanAttribute }) isElvis = false;
  @Input() componentData: ComponentData | undefined;
  @Input() elvisTitle: keyof typeof data.block | undefined;
}
