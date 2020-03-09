import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-typography-doc',
  templateUrl: './typography-doc.component.html',
  styleUrls: ['./typography-doc.component.scss']
})
export class TypographyDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-title', 'e-text', 'e-label'];

  example1 = `<h1 class="e-title-large">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h1>
<h2 class="e-title-medium">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h2>
<h3 class="e-title-small">Du åt ca fire wienerpølser og tok taxi hjem fra byen</h3>`;
  example2 = `<p class="e-text-lead">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>
<p class="e-text-quote">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>
<p class="e-text-caps">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>
<p class="e-text-body">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>
<p class="e-text-description">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>
<p class="e-text-info">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>`;
  example3 = `<p class="e-label-input">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>
<p class="e-label-option">Du åt ca fire wienerpølser og tok taxi hjem fra byen</p>`;

  constructor() { }

  ngOnInit() {
  }

}
