import {Component, Input} from '@angular/core';
import {TabNames} from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
  @Input() selected = TabNames.Overview;

  isDesktop = true;
  does = 'Follow standards for external and internal sites.';
  donts = 'Create new layouts for existing structures such as articles, factboxes etc.';

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Article, TabNames.Header, TabNames.Footer];

  displayDesktop(): void {
    this.isDesktop = true;
  }

  displayMobile(): void {
    this.isDesktop = false;
  }
}
