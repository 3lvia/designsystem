import { Component } from '@angular/core';
import { TypographyExampleExhibitFilterComponent } from './typography-example-exhibit-filter/typography-example-exhibit-filter.component';
import { Category, textTypographies, titleTypographies, specialTypographies, Modifier } from './typographies';
import { TypographyExampleExhibitListComponent } from './typography-example-exhibit-list/typography-example-exhibit-list.component';

@Component({
  standalone: true,
  imports: [TypographyExampleExhibitFilterComponent, TypographyExampleExhibitListComponent],
  selector: 'app-typography-example-exhibit',
  templateUrl: './typography-example-exhibit.component.html',
})
export class TypographyExampleExhibitComponent {
  selectedCategory: Category = 'title';
  selectedModifier: Modifier = 'regular';

  get activeTypography() {
    switch (this.selectedCategory) {
      case 'title':
        return titleTypographies;
      case 'body-text':
        return textTypographies;
      case 'special-text':
        return specialTypographies;
      default:
        return titleTypographies;
    }
  }

  get availableModifiers() {
    const uniqueModifierSet = new Set(
      this.activeTypography
        .filter((typography) => 'modifier' in typography)
        .map((typography) => 'modifier' in typography && typography.modifier)
        .filter(Boolean),
    );
    return Array.from(uniqueModifierSet.values());
  }
}
