import { Component } from '@angular/core';
import { componentsDocPages } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-overview',
  templateUrl: './overview-comp.component.html',
  styleUrls: ['./overview-comp.component.scss'],
})
export class OverviewComponent {
  overviewTitle = 'Components';
  pages = componentsDocPages;
}
