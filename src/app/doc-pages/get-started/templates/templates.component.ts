import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  @Input() selected = TabNames.Article;

  isDesktop = true;
  does = 'Follow standards for external and internal sites.';
  donts = 'Create new layouts for existing structures such as articles, factboxes etc.';

  tabs = [TabNames.Article, TabNames.Header, TabNames.Footer];

  constructor() { }

  ngOnInit() {
  }

  displayDesktop() {
    this.isDesktop = true;
  }

  displayMobile() {
    this.isDesktop = false;
  }


}
