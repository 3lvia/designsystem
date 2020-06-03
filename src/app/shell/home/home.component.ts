import { Component } from '@angular/core';
import { eHomes } from 'src/app/shared/e-items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  overviewTitle = 'Get started';
  pages = eHomes;

}
