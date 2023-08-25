import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-section',
  templateUrl: './component-section.component.html',
  styleUrls: ['./component-section.component.scss'],
})
export class ComponentSectionComponent {
  @Input() sectionTitle = '';
  @Input() propertiesClass = '';
  @Input() figmaOnly = false;

  titleIsCopied = false;

  constructor(private router: Router) {}

  copyAnchor(): void {
    this.titleIsCopied = true;
    setTimeout(() => {
      this.titleIsCopied = false;
    }, 800);
    const modifiedAnchor = this.sectionTitle.replace(/ /g, '-');
    let anchorUrl = location?.origin ?? 'https://design.elvia.io';
    if (this.router.url.includes('#')) {
      anchorUrl =
        anchorUrl + this.router.url.slice(0, this.router.url.lastIndexOf('#')) + '#' + modifiedAnchor;
    } else {
      anchorUrl = anchorUrl + this.router.url + '#' + modifiedAnchor;
    }
    navigator.clipboard.writeText(anchorUrl);
  }
}
