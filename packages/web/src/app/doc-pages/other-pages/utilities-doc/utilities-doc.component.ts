import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
})
export class UtilitiesDocComponent {
  description = getDocPagesNotFromCMS('utilities').description;
}
