import { Component } from '@angular/core';
import { eHomes } from 'src/app/shared/e-items';
import { SectionAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [SectionAnimation],
})
export class HomeComponent {
  overviewTitle = 'Get started';
  pages = eHomes;
}
