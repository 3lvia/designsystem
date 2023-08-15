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

  constructor(private router: Router) {}

  copyAnchor(): void {
    const anchorTitleElement = document.getElementById(this.sectionTitle);
    if (!anchorTitleElement) {
      return;
    }
    anchorTitleElement.classList.add('anchor-copied');
    setTimeout(() => {
      anchorTitleElement.classList.remove('anchor-copied');
    }, 800);
    const modifiedAnchor = this.sectionTitle.replace(/ /g, '-');
    let anchorUrl = 'https://design.elvia.io';
    if (this.router.url.includes('#')) {
      anchorUrl =
        anchorUrl + this.router.url.slice(0, this.router.url.lastIndexOf('#')) + '#' + modifiedAnchor;
    } else {
      anchorUrl = anchorUrl + this.router.url + '#' + modifiedAnchor;
    }
    navigator.clipboard.writeText(anchorUrl);
  }
}
