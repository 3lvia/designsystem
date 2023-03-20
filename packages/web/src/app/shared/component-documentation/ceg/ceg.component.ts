import { Component, ContentChild } from '@angular/core';
import { ComponentExample } from './componentExample';

@Component({
  selector: 'app-ceg',
  templateUrl: './ceg.component.html',
  styleUrls: ['./ceg.component.scss'],
})
export class CegComponent {
  @ContentChild(ComponentExample, { static: true }) cegContent: ComponentExample;
}
