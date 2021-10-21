import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-get-started-designers',
  templateUrl: './get-started-designers.component.html',
  styleUrls: ['./get-started-designers.component.scss'],
})
export class GetStartedDesignersComponent {
  description = getDocPagesNotFromCMS('get-started-designers').description;
}
