import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-the-design-system-doc',
  templateUrl: './the-design-system-doc.component.html',
  styleUrls: ['./the-design-system-doc.component.scss'],
})
export class TheDesignSystemDocComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('The Design System' + ' | ' + 'Elvia design system');
  }
}
