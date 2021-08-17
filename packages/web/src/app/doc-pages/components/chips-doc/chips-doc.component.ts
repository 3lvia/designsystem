import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { chipsData } from './chips-data';
import { exampleContents } from 'src/app/shared/example-contents';


@Component({
  selector: 'app-chips',
  templateUrl: './chips-doc.component.html',
  styleUrls: ['./chips-doc.component.scss'],
})
export class ChipsDocComponent {
  exampleContents = exampleContents;
  figmaUrl = getComponent('chips').figmaUrl;
  description = getComponent('chips').description;
  does = chipsData.does;
  donts = chipsData.donts;
  componentData = chipsData;
  chipsValue = 2010
}
