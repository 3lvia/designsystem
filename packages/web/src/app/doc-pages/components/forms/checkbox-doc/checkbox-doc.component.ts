import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss'],
})
export class CheckboxDocComponent {
  title = getComponent('checkbox')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['When user can select multiple options from a list.', 'Toggle a single option on or off.'];
  donts = ['If the user only can select one option from a list - use radio buttons.'];
}
