import { Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss'],
})
export class TypographyDocComponent implements OnDestroy {
  @ViewChildren('toCopy') toCopy: QueryList<ElementRef>;
  @ViewChildren('mobileTypography') mobileTypography: QueryList<ElementRef>;

  localizationSubscriber: Subscription;
  loadedImg = false;
  typographyClasses = [];
  title = getDocPagesNotFromCMS('typography')?.title;
  titleNo = getDocPagesNotFromCMS('typography')?.titleNo;
  description = getDocPagesNotFromCMS('typography')?.description;
  descriptionNo = getDocPagesNotFromCMS('typography')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('typography')?.figmaUrl;
  locale: LOCALE_CODE = 'en-GB';

  isDesktop = true;
  isMobile = false;

  constructor(private titleService: Title, private localizationService: LocalizationService) {
    this.setTabTitle();
    this.localizationSubscriber = this.localizationService.listenLocalization().subscribe((locale) => {
      this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
      this.setTabTitle();
    });
  }

  ngOnDestroy(): void {
    this.localizationSubscriber && this.localizationSubscriber.unsubscribe();
  }

  setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };

  alignmentOfText = `<div class="e-text-left e-m-16">Left aligned text</div>
<div class="e-text-center e-m-16">Center aligned text</div>
<div class="e-text-right e-m-16">Right aligned text</div>
`;

  exampleTitles = `<h1 class="e-title-lg">Title Large</h1>
<h2 class="e-title-md">Title Medium</h2>
<h3 class="e-title-sm">Title Small</h3>
<h4 class="e-title-xs">Title XSmall</h4>
<h5 class="e-title-caps">Title Caps</h5>
`;
  exampleText = `<p>
  <span class="e-text-lead e-mr-16">Text Lead</span>
</p>
<p>
  <span class="e-text-lg e-mr-16">Text Large</span>
  <span class="e-text-lg-strong e-mr-16">Text Large Strong</span>
  <span class="e-text-lg-light">Text Large Light</span>
</p>
<p>
  <span class="e-text-md e-mr-16">Text Medium</span>
  <span class="e-text-md-strong e-mr-16">Text Medium Strong</span>
  <span class="e-text-md-light">Text Medium Light</span>
</p>
<p>
  <span class="e-text-sm e-mr-16">Text Small</span>
  <span class="e-text-sm-strong e-mr-16">Text Small Strong</span>
  <span class="e-text-sm-light">Text Small Light</span>
</p>
`;
  exampleSpecial = `<p class="e-text-quote">Text Quote</p>
<p class="e-text-img">Text Image</p>
<p>
  <span class="e-text-micro e-mr-16">Text Micro</span>
  <span class="e-text-micro-strong e-mr-16">Text Micro Strong</span>
  <span class="e-text-micro-light">Text Micro Light</span>
</p>
`;

  changeListView(): void {
    this.isDesktop = !this.isDesktop;
    this.isMobile = !this.isMobile;
  }
  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedImg = true;
    }
  }
}
