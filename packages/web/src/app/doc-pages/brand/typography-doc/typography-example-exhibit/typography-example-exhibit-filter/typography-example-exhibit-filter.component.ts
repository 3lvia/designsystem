import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Modifier } from '../typographies';

import '@elvia/elvis-segmented-control';
import '@elvia/elvis-radio-filter';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-typography-example-exhibit-filter',
  templateUrl: './typography-example-exhibit-filter.component.html',
  styleUrls: ['./typography-example-exhibit-filter.component.scss'],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypographyExampleExhibitFilterComponent {
  @Input({ required: true }) activeCategory: Category;
  @Output() newActiveCategory = new EventEmitter<Category>();

  @Input({ required: true }) modifiers: Modifier[];
  @Output() newModifiers = new EventEmitter<Modifier>();
  currentModifier: Modifier = 'regular';

  displayCategories = [{ label: 'Title' }, { label: 'Body text' }, { label: 'Special text' }];

  constructor(public breakpointService: BreakpointService) {
    breakpointService
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
    return this.categories.indexOf(this.activeCategory);
  }

  get modifierRadioFilters() {
    return this.modifiers.map((modifier) => ({
      value: modifier,
      label: modifier.charAt(0).toUpperCase() + modifier.slice(1),
    }));
  }

  private displayCategoryToCategory = (category: string): Category => {
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
