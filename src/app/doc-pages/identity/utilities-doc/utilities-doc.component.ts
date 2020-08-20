import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
})
export class UtilitiesDocComponent {

  example1 = 'Just some test';
  description = getIdentity('utilities-doc').description;

}
