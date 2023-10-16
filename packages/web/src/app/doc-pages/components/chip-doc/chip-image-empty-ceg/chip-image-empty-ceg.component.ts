import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./chip-image-empty-ceg.component.html';
import { Theme, ThemeService } from 'src/app/core/services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chip-empty-image-ceg',
  templateUrl: './chip-image-empty-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ChipImageEmptyCegComponent }],
})
export class ChipImageEmptyCegComponent implements StaticComponentExample {
  html = template.default;
  currentTheme: Theme = 'light';

  constructor(themeService: ThemeService) {
    themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((newTheme) => (this.currentTheme = newTheme));
  }
}
