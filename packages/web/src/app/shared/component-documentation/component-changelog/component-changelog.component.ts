import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-changelog',
  templateUrl: './component-changelog.component.html',
  styleUrls: ['./component-changelog.component.scss'],
})
export class ComponentChangelogComponent {
  @Input() changelog;
  @Input() showAll = false;
}
