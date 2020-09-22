import { Component, OnInit } from '@angular/core';
import { eTools } from 'src/app/shared/e-items';
import { EItems } from 'src/app/shared/e-items.interface';

@Component({
  selector: 'app-overview-tools',
  templateUrl: './overview-tools.component.html',
  styleUrls: ['./overview-tools.component.scss'],
})
export class OverviewToolsComponent implements OnInit {
  overviewTitle = 'Tools';
  // tslint:disable-next-line:max-line-length
  description = 'Whether you need inspiration or concrete advice, our library of tools gather methods and information for both designers and developers to help in your project.';
  pages = eTools;
  loadedImg = false;

  filteredPages: EItems[];

  ngOnInit(): void {
    this.filteredPages = this.pages.filter((page) => {
      return page.status !== 'Coming';
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedImg = true;
    }
  }
}
