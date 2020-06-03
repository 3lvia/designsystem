import { Component } from '@angular/core';
import { eUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-util',
  templateUrl: './overview-util.component.html',
  styleUrls: ['./overview-util.component.scss']
})
export class OverviewUtilComponent {

  overviewTitle = 'Utilities';
  pages = eUtilities;

}
