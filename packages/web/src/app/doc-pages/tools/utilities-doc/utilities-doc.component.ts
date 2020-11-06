import { Component } from '@angular/core';
import { getTools } from 'src/app/shared/e-items';

@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
})
export class UtilitiesDocComponent {

  description = getTools('utilities').description;

}
