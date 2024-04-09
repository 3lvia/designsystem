import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, effect, model, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { filter, fromEvent } from 'rxjs';

import { IconPreviewDetailsComponent } from './icon-preview-details/icon-preview-details.component';
import { FilterValue, IconPreviewFilterComponent } from './icon-preview-filter/icon-preview-filter.component';
import { Icon, getIconList } from './utils';
import { Theme } from 'src/app/core/services/theme.service';
import { CopyComponent } from 'src/app/shared/copy/copy.component';

const allIcons = getIconList();

@Component({
  selector: 'app-icon-preview',
  standalone: true,
  imports: [NgClass, RouterLink, CopyComponent, IconPreviewFilterComponent, IconPreviewDetailsComponent],
  templateUrl: './icon-preview.component.html',
  styleUrl: './icon-preview.component.scss',
  animations: [
    trigger('entranceAnimation', [
      transition(':enter', [
        style({ opacity: 0, translate: '0 24px' }),
        animate('200ms ease-in-out', style({ opacity: 1, translate: '0' })),
      ]),
      transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0, translate: '0 24px' }))]),
    ]),
  ],
})
export class IconPreviewComponent {
  searchTerm = model('');
  theme = model<Theme>('light');
  filter = model<FilterValue>('all');
  visibleIcons = allIcons;

  selectedIcon = signal<Icon | null>(null);

  constructor() {
    effect(() => {
      this.visibleIcons = allIcons
        .filter((icon) => {
          const searchTerm = this.searchTerm().toLowerCase();
          return (
            icon.title.toLowerCase().includes(searchTerm) ||
            icon.terms.some((term) => term.toLowerCase().includes(searchTerm))
          );
        })
        .filter((icon) => {
          if (this.filter() === 'all') {
            return true;
          }
          if (this.filter() === 'outline') {
            return !icon.title.includes('-filled') && !icon.title.includes('-color');
          }
          if (this.filter() === 'filled') {
            return icon.title.includes('-filled');
          }
          if (this.filter() === 'colored') {
            return icon.title.includes('-color');
          }
          return false;
        });
    });

    fromEvent(document, 'keydown')
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof KeyboardEvent && event.key === 'Escape'),
      )
      .subscribe(() => {
        this.selectedIcon.set(null);
      });

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
  }
}
