import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';
import * as typography from '@elvia/elvis/src/config/typography.config';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss'],
})
export class TypographyDocComponent implements OnInit {
  @ViewChildren('toCopy') toCopy: QueryList<ElementRef>;
  @ViewChildren('mobileTypography') mobileTypography: QueryList<ElementRef>;

  typographyClasses = [];
  figmaUrl = getIdentity('typography').figmaUrl;
  description = getIdentity('typography').description;

  isDesktop = true;
  isMobile = false;

  alignmentOfText = `<div class="e-text-left e-m-16">Left aligned text</div>
<div class="e-text-center e-m-16">Center aligned text</div>
<div class="e-text-right e-m-16">Right aligned text</div>
`;

  exampleTitles = `<h1 class="e-title-lg">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h1>
<h2 class="e-title-md">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h2>
<h3 class="e-title-sm">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h3>
<h4 class="e-title-xs">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h4>
<h5 class="e-text-caps">AV PETTER JENSEN</h5>
`;
  exampleText = `<p class="e-text-lead">En tørr sommer i tillegg til en kald vinter, gjør at mange vil få høyere strømregning.</p>
<p class="e-text-lg">Du åt ca fire wienerpølser og tok taxi hjem fra byen. Du åt ca fire wienerpølser og tok taxi hjem fra byen.</p>
<p class="e-text-md">Ved å legge til e-post på din bruker</p>
<p class="e-text-sm">Tekst i en tabell</p>
`;
  exampleSpecial = `<p class="e-text-quote">En hjemmeladestasjon for elbilen er smart! Ladingen går raskere og den blir tryggere.</p>
<p class="e-text-img">Jordfeil er en samlebetegnelse på situasjoner der du har feil eller isolasjonssvikt i det elektriske anlegget eller tilknyttet utstyr. </p>
`;

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
}
