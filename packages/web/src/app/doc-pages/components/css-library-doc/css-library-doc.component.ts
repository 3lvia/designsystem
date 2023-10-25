import { Component } from '@angular/core';
import { cssLibraryData } from './css-library-data';
import changelogJson from '@elvia/elvis/CHANGELOG.json';

@Component({
  selector: 'app-css-library-doc',
  templateUrl: './css-library-doc.component.html',
  styleUrls: ['./css-library-doc.component.scss'],
})
export class CSSLibraryDocComponent {
  componentData = cssLibraryData;
  changelog = changelogJson.content;
}
