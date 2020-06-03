import { Component } from '@angular/core';
import { eComponents } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview',
  templateUrl: './overview-comp.component.html',
  styleUrls: ['./overview-comp.component.scss']
})
export class OverviewComponent {

  overviewTitle = 'Components';
  pages = eComponents;

}
