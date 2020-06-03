import { Component, Input } from '@angular/core';
import { SectionAnimation } from '../animations';


@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  animations: [SectionAnimation]

})
export class OverviewPageComponent {

  @Input() overviewTitle: string;
  @Input() pages: string[];

}

