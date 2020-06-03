import { Component } from '@angular/core';
import { eComponents } from 'src/app/shared/e-items';

@Component({
  selector: 'app-components-start',
  templateUrl: './components-start.component.html',
  styleUrls: ['./components-start.component.scss']
})
export class ComponentsStartComponent {

  pages = eComponents;

}
