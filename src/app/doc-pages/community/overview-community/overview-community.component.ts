import { Component, OnInit } from '@angular/core';
import { eCommunity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-community',
  templateUrl: './overview-community.component.html',
  styleUrls: ['./overview-community.component.scss'],
})
export class OverviewCommunityComponent implements OnInit {
  overviewTitle = 'Community';
  pages = eCommunity;

  ngOnInit(): void {
    this.pages = this.pages.filter(page => {
      return page.title !== 'Contribute';
    });
  }
}
