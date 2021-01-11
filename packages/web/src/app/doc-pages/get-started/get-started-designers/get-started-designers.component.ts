import { Component } from '@angular/core';
import { getGetStarted } from 'src/app/shared/e-items';

@Component({
  selector: 'app-get-started-designers',
  templateUrl: './get-started-designers.component.html',
  styleUrls: ['./get-started-designers.component.scss'],
})
export class GetStartedDesignersComponent {
  description = getGetStarted('get-started-designers').description;
}
