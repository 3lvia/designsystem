import { Component } from '@angular/core';
import { eCommunity } from 'src/app/shared/e-items';
import * as Content from '@elvia/content/dist/community-cms-test';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { CMSService } from 'src/app/core/services/cms.service';


@Component({
  selector: 'app-overview-community',
  templateUrl: './overview-community.component.html',
  styleUrls: ['./overview-community.component.scss'],
})
export class OverviewCommunityComponent {
  overviewTitle = 'Community';
  pages = eCommunity;
  loadedImg = false;
  cmsContent = '';

  constructor(private cmsService: CMSService) {
    this.cmsContent = cmsService.getContent("test");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any): void {
    if (evt && evt.target) {
      this.loadedImg = true;
    }
  }
}
