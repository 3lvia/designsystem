import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-spacing-doc',
  templateUrl: './spacing-doc.component.html',
  styleUrls: ['./spacing-doc.component.scss']
})
export class SpacingDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabs = [TabNames.Overview, TabNames.Guidelines];
  componentClasses = ['e-p', 'e-m'];

  constructor() { }

  ngOnInit() {
  }

}
