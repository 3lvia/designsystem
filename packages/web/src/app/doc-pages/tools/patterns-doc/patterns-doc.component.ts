import { Component } from '@angular/core';
import { getTools } from 'src/app/shared/e-items';

@Component({
  selector: 'app-patterns-doc',
  templateUrl: './patterns-doc.component.html',
  styleUrls: ['./patterns-doc.component.scss'],
})
export class PatternsDocComponent {
  description = getTools('patterns').description;
}
