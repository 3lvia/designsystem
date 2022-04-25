import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-changelog',
  templateUrl: './component-changelog.component.html',
  styleUrls: ['./component-changelog.component.scss'],
})
export class ComponentChangelogComponent {
  @Input() changelog;
  /**
   * If enabled accordion will be hidden and
   * all elements will be visible
   */
  @Input() showAll = false;
  /**
   * Will hide all but first element
   */
  @Input() isFrontpage = false;
}
