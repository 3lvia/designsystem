import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';
import * as typography from 'style/elvis/src/config/typography.config';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss'],
})
export class TypographyDocComponent implements OnInit {
  @ViewChildren('toCopy') toCopy: QueryList<ElementRef>;
  @ViewChildren('mobileTypography') mobileTypography: QueryList<ElementRef>;

  typographyClasses = [];
  figmaUrl = getIdentity('typography-doc').figmaUrl;
  description = getIdentity('typography-doc').description;

  alignmentOfText = `<div class="e-text-left e-m-16">Left aligned text</div>
<div class="e-text-right e-m-16">Right aligned text</div>
<div class="e-text-center e-m-16">Center aligned text</div>
`;

  example1 = `<h1 class="e-title-lg">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h1>
<h2 class="e-title-md">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h2>
<h3 class="e-title-sm">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h3>`;
  example2 = `<p class="e-text-lead">En tørr sommer i tillegg til en kald vinter, gjør at mange vil få høyere strømregning.</p>
<p class="e-text-quote">En hjemmeladestasjon for elbilen er smart! Ladingen går raskere og den blir tryggere.</p>
<p class="e-text-body">Du åt ca fire wienerpølser og tok taxi hjem fra byen. Du åt ca fire wienerpølser og tok taxi hjem fra byen.</p>
<p class="e-text-img">Jordfeil er en samlebetegnelse på situasjoner der du har feil
eller isolasjonssvikt i det elektriske anlegget eller tilknyttet utstyr. </p>
<p class="e-text-description">Ved å legge til e-post på din bruker</p>
<p class="e-text-caps">AV PETTER JENSEN</p>
<p class="e-text-info">Tekst i en tabell</p>`;
  example3 = `<p class="e-text-label">Label title</p>
<p class="e-text-option">Placeholder text</p>`;

  ngOnInit(): void {
    this.fillTypography();
  }

  fillTypography(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < typography.length; i++) {
      this.typographyClasses.push(typography[i]);
    }
  }
}
