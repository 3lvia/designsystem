import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CopyComponent } from '../../../copy/copy.component';

@Component({
  selector: 'app-component-section',
  templateUrl: './component-section.component.html',
  styleUrls: ['./component-section.component.scss'],
  imports: [CopyComponent, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentSectionComponent {
  private router = inject(Router);

  readonly sectionTitle = input('');
  readonly propertiesClass = input('');
  readonly figmaOnly = input(false);

  titleIsCopied = signal(false);

  copyUrl = computed(() => {
    const modifiedAnchor = this.sectionTitle().replace(/ /g, '-');
    let anchorUrl = location?.origin ?? 'https://design.elvia.io';
    if (this.router.url.includes('#')) {
      anchorUrl =
        anchorUrl + this.router.url.slice(0, this.router.url.lastIndexOf('#')) + '#' + modifiedAnchor;
    } else {
      anchorUrl = anchorUrl + this.router.url + '#' + modifiedAnchor;
    }
    return anchorUrl;
  });

  copyAnchor(): void {
    this.titleIsCopied.set(true);
    setTimeout(() => {
      this.titleIsCopied.set(false);
    }, 800);
  }
}
