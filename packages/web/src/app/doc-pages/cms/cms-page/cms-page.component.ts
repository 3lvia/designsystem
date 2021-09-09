import { Component, ViewEncapsulation } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CMSPageComponent {
  cmsContent: any = {};
  html: any = '';

  constructor(
    private cmsService: CMSService,
    private sanitizer: DomSanitizer,
    private localizationService: LocalizationService,
    private route: ActivatedRoute,
  ) {
    const subscriber1 = this.localizationService.listenLocalization();
    const subscriber2 = this.route.params;
    combineLatest([subscriber1, subscriber2]).subscribe((value) => {
      this.updateContent(value[0]);
    });
  }

  async updateContent(locale: Locale): Promise<any> {
    // TODO: Test på om landing-page eksisterer
    const url = this.route.snapshot.url;
    const menu = await this.cmsService.getMenu(locale);
    const subMenu = menu['pages'].find((sub) => sub.path === url[0].path);
    if (!subMenu) {
      console.error('FOUND NO SUBMENU WITH THAT PATH');
    }
    if (!url[1]) {
      this.updateContentByEntryId(subMenu.entry.fields.landingPage['en-GB'].sys.id, locale);
      return;
    } else {
      const docPage = subMenu.entry.fields.pages['en-GB'].find(
        (page) => page.fields.path['en-GB'] === url[1].path,
      );
      if (!docPage) {
        console.error('FOUND NO PAGE WITH THAT PATH');
      }
      this.updateContentByEntryId(docPage.sys.id, locale);
      return;
    }
  }

  updateContentByEntryId(entryId, locale) {
    this.cmsService.getDocumentationPageByEntryId(entryId, locale).then((content) => {
      this.cmsContent = content;
      this.html = this.sanitizer.bypassSecurityTrustHtml(content.content);
    });
  }
}
