import { Component, ElementRef, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-input-doc',
  templateUrl: './input-doc.component.html',
  styleUrls: ['./input-doc.component.scss'],
})
export class InputDocComponent {
  @ViewChild('validationExample') validationExample: ElementRef;

  showPassword = false;
  figmaUrl = getComponent('input')?.figmaUrl;
  description = getComponent('input')?.description;
  title = getComponent('input')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = [
    'Text fields should be used in forms where the user has to fill in something that is not from a set of choices.',
  ];
  donts = [
    'If the user can choose from a set of options, use dropdown, radio buttons, checkboxes, or auto-complete fields instead.',
  ];
}
