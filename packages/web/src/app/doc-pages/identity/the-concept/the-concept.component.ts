import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';
import { CMSService } from 'src/app/core/services/cms.service';

@Component({
  selector: 'app-the-concept',
  templateUrl: './the-concept.component.html',
  styleUrls: ['./the-concept.component.scss'],
})
export class TheConceptComponent {
  description = getIdentity('the-concept').description;
  cmsContent: any = {};

  constructor(private cmsService: CMSService) {
    this.cmsContent = cmsService.getContent('concept');
    if (this.cmsContent.pageDescription) {
      this.description = this.cmsContent.pageDescription;
    }
  }
}
