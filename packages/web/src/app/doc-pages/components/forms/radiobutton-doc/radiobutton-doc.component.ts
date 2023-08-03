import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-radiobutton-doc',
  templateUrl: './radiobutton-doc.component.html',
  styleUrls: ['./radiobutton-doc.component.scss'],
})
export class RadiobuttonDocComponent {
  title = getComponent('radiobutton')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = [
    'When you only can select one option.',
    'Want to visually expose all options instead of hiding them in a dropdown.',
  ];
  donts = [
    'If it is possible to select more than one option - use checkbox.',
    'If you have more than five options in total - use dropdown.',
  ];
}
