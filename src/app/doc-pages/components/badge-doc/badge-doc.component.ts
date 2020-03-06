import { Component, OnInit, Input } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Modifiers];
  componentStatus = getComponent('badge-doc').status;
  componentClasses = ['e-badge'];

  example1 = `<span class="e-badge">101001</span>
`;
  example1Description = 'A simple badge bladi bladi bla bladi bla bladi bladi bla bladi bladi bladi bla bladi bladi bla';
  example1Does = 'Does does does does does does does does does';
  example1Donts = 'Donts donts donts donts donts donts donts donts';

  example2 = `<span class="e-badge">101001</span>
<span class="e-badge e-bg-green-lime">101001</span>
<span class="e-badge e-bg-orange-peel">101001</span>
<span class="e-badge e-bg-yellow">101001</span>
`;

  constructor() { }

  ngOnInit() {
  }

}
