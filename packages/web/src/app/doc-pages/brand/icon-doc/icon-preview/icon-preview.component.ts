import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import { Component, computed, model, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { filter, fromEvent } from 'rxjs';

import { entranceAnimation } from '../../exhibit-detail-animation';
import { IconGeneratorComponent } from '../icon-generator/icon-generator.component';
import { IconPreviewDetailsComponent } from './icon-preview-details/icon-preview-details.component';
import { FilterValue, IconPreviewFilterComponent } from './icon-preview-filter/icon-preview-filter.component';
import { Icon, getIconList } from './utils';
import { Theme } from 'src/app/core/services/theme.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

const allIcons = getIconList();

@Component({
  selector: 'app-icon-preview',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    CdkTrapFocus,
    CopyComponent,
    IconPreviewFilterComponent,
    IconPreviewDetailsComponent,
    IconGeneratorComponent,
  ],
  templateUrl: './icon-preview.component.html',
  styleUrl: './icon-preview.component.scss',
  animations: [entranceAnimation],
})
export class IconPreviewComponent {
  searchTerm = model('');
  theme = model<Theme>('light');
  filter = model<FilterValue>('all');
  visibleIcons = computed(() =>
    allIcons
      .filter((icon) => {
        const searchTerm = this.searchTerm().toLowerCase();
        return (
          icon.title.toLowerCase().replace(/[-_]/g, '').includes(searchTerm) ||
          icon.terms.some((term) => term.toLowerCase().includes(searchTerm))
        );
      })
      .filter((icon) => {
        switch (this.filter()) {
          case 'all':
            return true;
          case 'outline':
            return !icon.title.includes('-filled') && !icon.title.includes('-color');
          case 'filled':
            return icon.title.includes('-filled');
          case 'colored':
            return icon.title.includes('-color');
          default:
            return false;
        }
      }),
  );

  selectedIcon = signal<Icon | null>(null);

  constructor() {
    this.closeOnEscape();
    this.closeOnClickOutside();
  }

  private closeOnEscape = () => {
    fromEvent(document, 'keydown')
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof KeyboardEvent && event.key === 'Escape'),
      )
      .subscribe(() => {
        this.selectedIcon.set(null);
      });
  };

  private closeOnClickOutside = () => {
    fromEvent(document, 'click')
      .pipe(
        takeUntilDestroyed(),
        filter(
          (event) =>
            !(event.target as HTMLElement)?.closest(
              'app-icon-preview-details, .icon-card, elvia-radio-filter, elvia-segmented-control',
            ),
        ),
      )
      .subscribe(() => {
        this.selectedIcon.set(null);
      });
  };
}
