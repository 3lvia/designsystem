import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import '@elvia/elvis-radio-filter';
import '@elvia/elvis-segmented-control';

import { Category, Modifier } from '../typographies';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

type DisplayCategories = 'Title' | 'Body' | 'Body text' | 'Special' | 'Special text';

@Component({
  selector: 'app-typography-example-exhibit-filter',
  templateUrl: './typography-example-exhibit-filter.component.html',
  styleUrls: ['./typography-example-exhibit-filter.component.scss'],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypographyExampleExhibitFilterComponent {
  protected breakpointService = inject(BreakpointService);

  readonly activeCategory = input.required<Category>();
  readonly newActiveCategory = output<Category>();

  readonly modifiers = input.required<Modifier[]>();
  readonly newModifiers = output<Modifier>();
  currentModifier: Modifier = 'regular';

  displayCategories: { label: DisplayCategories }[] = [
    { label: 'Title' },
    { label: 'Body text' },
    { label: 'Special text' },
  ];

  constructor() {
    this.breakpointService
      .matches(['xs', 'sm'])
      .pipe(takeUntilDestroyed())
      .subscribe(
        (matches) =>
          (this.displayCategories = matches
            ? [{ label: 'Title' }, { label: 'Body' }, { label: 'Special' }]
            : [{ label: 'Title' }, { label: 'Body text' }, { label: 'Special text' }]),
      );
  }

  emitNewActiveCategory = (index: number) => {
    this.emitNewModifier('regular');
    // @ts-expect-error TS2345 (LEGO-3683)
    this.newActiveCategory.emit(this.categories[index]);
  };

  emitNewModifier = (newModifier: Modifier) => {
    this.currentModifier = newModifier;
    this.newModifiers.emit(newModifier);
  };

  get categories(): Category[] {
    return this.displayCategories.map((category) => this.displayCategoryToCategory(category.label));
  }

  get activeCategoryIndex() {
    return this.categories.indexOf(this.activeCategory());
  }

  get modifierRadioFilters() {
    return this.modifiers().map((modifier) => ({
      value: modifier,
      label: modifier.charAt(0).toUpperCase() + modifier.slice(1),
    }));
  }

  private displayCategoryToCategory = (category: DisplayCategories): Category => {
    switch (category) {
      case 'Title':
        return 'title';
      case 'Body text':
      case 'Body':
        return 'body-text';
      case 'Special text':
      case 'Special':
        return 'special-text';
      default:
        return 'title';
    }
  };
}
