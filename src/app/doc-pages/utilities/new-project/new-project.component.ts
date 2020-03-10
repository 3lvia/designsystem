import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  componentStatus = getUtilities('new-project-doc').status;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Guidelines];

  constructor() { }

  ngOnInit() {
  }

}
