import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-the-concept',
  templateUrl: './the-concept.component.html',
  styleUrls: ['./the-concept.component.scss']
})
export class TheConceptComponent {
  figmaUrl = getIdentity('the-concept').figmaUrl;
  description = getIdentity('the-concept').description;
}
