import { Component } from '@angular/core';
import { eTools } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss'],
})
export class OverviewToolsComponent {
  overviewTitle = 'Tools';
  pages = eTools;
}
