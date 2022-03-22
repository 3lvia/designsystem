import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-changelog',
  templateUrl: './component-changelog.component.html',
  styleUrls: ['./component-changelog.component.scss'],
})
export class ComponentChangelogComponent {
  @Input() componentData;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ngOnInit() {
    console.log(this.componentData);
  }
}
