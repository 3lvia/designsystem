import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-button-doc',
  templateUrl: './button-doc.component.html',
})
export class ButtonDocComponent {
  title = getComponent('button')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  doesExample1 = [
    'Primary buttons are task oriented buttons, that normally is used for task like save, done, or next actions. It is often the primary positive action of a use case. Can be used alone, or combined with a secondary and link style button.',
  ];
  doesExample2 = [
    'Secondary buttons are similar to primary buttons but is used as a supportive action, or for less important actions. Can be used alone, or combined with a primary og link styled button.',
  ];
  dontsExampleIcon = [
    'Unknown icon that is not descriptive alone without text.',
    'Don’t use both transparent and circle icons next to each other in a group',
  ];
  doesExampleIcon = [
    'Known actions that do not attract much attention.',
    'Different actions grouped together (example: A table where you can delete, edit and move)',
  ];
  dontsExample7 = [
    'On actions that could have disabled state. Links do not have an disabled state, and the e-btn disabled style will not be applied on links with disabled html syntax.',
  ];
}
