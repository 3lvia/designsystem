import { Component } from '@angular/core';

import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-locale-picker',
  templateUrl: './locale-picker.component.html',
  styleUrls: ['./locale-picker.component.scss'],
})
export class LocalePickerComponent {
  selectedLocale: Locale = 'en-GB';

  constructor(private localizationService: LocalizationService) {
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
