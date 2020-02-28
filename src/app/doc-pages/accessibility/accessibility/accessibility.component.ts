import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabs = [TabNames.Overview, TabNames.Tips];

  constructor() { }

  ngOnInit() {
  }

}
