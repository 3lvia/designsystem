import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss']
})
export class ShadowDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Guidelines];
  componentStatus = getUtilities('shadow-doc').status;
  externalUrl = getUtilities('shadow-doc').externalUrl;
  does = ['Behind a solid surface together with example cards.'];
  donts = ['Should not be applied to typography or icons.',
  'Don’t use a lot of shadows on the same surface, since we want our visual profile to be have a more flat expression.'];

  doCodeCSS = `box-shadow: var(--e-shadow-6);
box-shadow: none;`;
  dontCodeCSS = `box-shadow: var(--e-shadow-none);`;

  constructor() { }

  ngOnInit() {
  }

}


