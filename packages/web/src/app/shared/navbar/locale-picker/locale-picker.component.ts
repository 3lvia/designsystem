import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Locale, LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-locale-picker',
  templateUrl: './locale-picker.component.html',
  styleUrls: ['./locale-picker.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocalePickerComponent {
  private localizationService = inject(LocalizationService);

  selectedLocale: Locale = 'en-GB';

  constructor() {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.selectedLocale = locale;
      });
  }

  setLocale(locale: Locale): void {
    this.localizationService.setLocalization(locale);
    this.localizationService.setPreferredLocalization(locale);
  }
}
