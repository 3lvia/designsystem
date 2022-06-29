import { Component } from '@angular/core';
import { componentsDocPages } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-overview',
  templateUrl: './overview-comp.component.html',
})
export class OverviewComponent {
  overviewTitle = 'Components';
  pages = componentsDocPages;
}
