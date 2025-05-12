import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import * as template from './chip-image-empty-ceg.component.html';
import { Theme, ThemeService } from 'src/app/core/services/theme.service';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-chip-empty-image-ceg',
  templateUrl: './chip-image-empty-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ChipImageEmptyCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipImageEmptyCegComponent implements StaticComponentExample {
  private themeService = inject(ThemeService);
  html = template.default;
  currentTheme: Theme = 'light';

  constructor() {
    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((newTheme) => (this.currentTheme = newTheme));
  }
}
