import { Component, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-accessibility-doc',
  templateUrl: './accessibility-doc.component.html',
  styleUrls: ['./accessibility-doc.component.scss'],
})
export class AccessibilityDocComponent {
  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Tips];
}
