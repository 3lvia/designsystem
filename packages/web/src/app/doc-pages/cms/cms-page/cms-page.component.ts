import { Component, ViewEncapsulation } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarAnchor } from 'src/app/shared/navbarAnchor.interface';
import { eGetStarted } from 'src/app/shared/e-items';
@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CMSPageComponent {
  cmsContent: any = {};
  html: any = '';

  pages = eGetStarted;
  constructor(
    private cmsService: CMSService,
    private sanitizer: DomSanitizer,
    private localizationService: LocalizationService,
    private route: ActivatedRoute,
  ) {
    this.localizationService.listenLocalization().subscribe(async (locale) => {

      const url = route.snapshot.url;
      const menu = await this.cmsService.getMenu(locale);

      const subMenu = menu['pages'].find(sub => sub.path === url[0].path);
      if (!subMenu) {
        console.error("FOUND NO SUBMENU WITH THAT PATH");
      }
      if (!url[1]) {
        this.updateContentByEntryId(subMenu.entry.fields.landingPage['en-GB'].sys.id, locale);
        return;
      } else {
        const docPage = subMenu.entry.fields.pages['en-GB'].find(page => page.fields.path['en-GB'] === url[1].path);
        if (!docPage) {
          console.error("FOUND NO PAGE WITH THAT PATH");
        }
        this.updateContentByEntryId(docPage.sys.id, locale);
        return;
      }
    });
  }

  updateContentByEntryId(entryId, locale) {
    this.cmsService.getDocumentationPageByEntryId(entryId, locale).then((content) => {
      this.cmsContent = content;
      this.html = this.sanitizer.bypassSecurityTrustHtml(content.content);
    });
  }
}
