import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-patterns-doc',
  templateUrl: './patterns-doc.component.html',
  styleUrls: ['./patterns-doc.component.scss'],
})
export class PatternsDocComponent {
  description = getDocPagesNotFromCMS('patterns').description;
}
