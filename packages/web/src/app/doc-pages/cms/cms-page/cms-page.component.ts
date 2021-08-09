import { Component, ViewEncapsulation } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CMSPageComponent {
  cmsContent: any = {};
  html: any = '';

  constructor(private cmsService: CMSService, private sanitizer: DomSanitizer, private localizationService: LocalizationService, private route: ActivatedRoute) {
    this.localizationService.listenLocalization().subscribe((locale) => {
      this.updateContent(route.snapshot.routeConfig.path, locale);
    });
  }

  updateContent(page, locale) {
    this.cmsService.getDocumentationPage(page, locale).then(content => {
      this.cmsContent = content;
      this.html = this.sanitizer.bypassSecurityTrustHtml(content.content);
    });
  }
}
