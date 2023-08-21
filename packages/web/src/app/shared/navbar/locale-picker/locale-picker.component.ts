import { Component } from '@angular/core';

import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-locale-picker',
  templateUrl: './locale-picker.component.html',
  styleUrls: ['./locale-picker.component.scss'],
})
export class LocalePickerComponent {
  selectedLocale: LOCALE_CODE = 'en-GB';

  constructor(private localizationService: LocalizationService) {
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.selectedLocale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
      });
  }

  setLocale(locale: LOCALE_CODE): void {
    this.localizationService.setLocalization(Locale[locale]);
    this.localizationService.setPreferredLocalization(Locale[locale]);
  }
}
