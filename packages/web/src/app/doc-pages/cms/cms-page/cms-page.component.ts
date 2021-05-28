import { Component } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
})
export class CMSPageComponent {
  cmsContent: any = {};
  html: any = '';
  description = '';

  constructor(private cmsService: CMSService, private sanitizer: DomSanitizer) {
    //TODO: Use routing to decide which page to load, instead of "TheConcept"
    cmsService.getDocumentationPage('TheConcept').then(content => {
      this.cmsContent = content;
      this.html = sanitizer.bypassSecurityTrustHtml(content.content);
      if (this.cmsContent.pageDescription) {
        this.description = this.cmsContent.pageDescription;
      }
    });
  }
}
