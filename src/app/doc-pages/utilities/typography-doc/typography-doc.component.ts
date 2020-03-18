import { Component, Input, ElementRef , QueryList, ViewChildren, } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import { typographyItems } from './typography';
import { Typography } from './typography.interface';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss']
})
export class TypographyDocComponent  {

  @Input() selected = TabNames.Overview;
  @ViewChildren('toCopy') toCopy: QueryList<ElementRef>;
  @ViewChildren('mobileTypography') mobileTypography: QueryList<ElementRef>;

  typographyItems = typographyItems;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-title', 'e-text', 'e-label'];
  componentStatus = getUtilities('typography-doc').status;

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
  example3 = `<p class="e-label-input">Label title</p>
<p class="e-label-option">Placeholder text</p>`;

  constructor() { }

  getCodeExample(t: Typography) {
    return `<p class="e-${t.title}">${t.example}</p>`;
  }

}
