import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import * as typography from '@elvia/elvis/src/config/typography.config';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss'],
})
export class TypographyDocComponent implements OnInit {
  @ViewChildren('toCopy') toCopy: QueryList<ElementRef>;
  @ViewChildren('mobileTypography') mobileTypography: QueryList<ElementRef>;

  loadedImg = false;

  typographyClasses = [];
  figmaUrl = getDocPagesNotFromCMS('typography').figmaUrl;
  description = getDocPagesNotFromCMS('typography').description;

  isDesktop = true;
  isMobile = false;

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
  exampleCss = `@use '@elvia/elvis-typography/src/elviaTypography.scss';`;
  exampleImportFonts = `@import url("https://fonts.googleapis.com/css?family=Red+Hat+Display:400,400i,500,700,900&display=swap");
@import url("https://fonts.googleapis.com/css?family=Red+Hat+Text:400,400i,500,600,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,400;0,500;1,400&display=swap");`;
  doCodeTS = `import { getTypography } from '@elvia/elvis-typography';
const typography = getTypography('text-md');`;
  dontCodeTS = `import typographies from '@elvia/elvis-typography';
const typography = typographies['text-md'];`;
  exampleStyledComponents = `import styled from 'styled-components';
import { getTypography } from '@elvia/elvis-typography';

const typography = getTypography('text-md');
const MediumParagraph = styled.p'\${typography}';`;

  ngOnInit(): void {
    this.fillTypography();
  }

  fillTypography(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < typography.length; i++) {
      this.typographyClasses.push(typography[i]);
    }
  }

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
