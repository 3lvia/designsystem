import { Component } from '@angular/core';
import { ThemeName } from '@elvia/elvis-colors';
import { Observable } from 'rxjs';

import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Shadow {
  title: string;
  token: string;
  blur: number;
  opacity: number;
}

@Component({
  selector: 'app-shadow-viewer',
  templateUrl: './shadow-viewer.component.html',
  styleUrls: ['./shadow-viewer.component.scss'],
})
export class ShadowViewerComponent {
  currentLocale: Locale = 'en-GB';
  activeTheme: ThemeName = 'light';
  isMobile: Observable<boolean>;
  shadows: Shadow[] = [
    { title: 'Soft', token: 'e-shadow-soft', blur: 50, opacity: 3 },
    { title: 'Medium', token: 'e-shadow-medium', blur: 40, opacity: 6 },
    { title: 'Hard', token: 'e-shadow-hard', blur: 30, opacity: 8 },
  ];
  noShadowOnDarkThemeTexts: Record<string, Record<Locale, string>> = {
    title: {
      'en-GB': 'Not in dark mode',
      'nb-NO': 'Ingen skygger i mørkt tema',
    },
    body: {
      'en-GB':
        'Shadows do not exist in dark theme. To create depth, use lighter elements on top of darker elements, or use a border.',
      'nb-NO':
        'Skygger skal ikke brukes i mørkt tema. For å skape dybde kan man bruke en lysere bakgrunn eller ramme på toppen av et mørkt element.',
    },
    exampleTitle: {
      'en-GB': 'Example',
      'nb-NO': 'Eksempel',
    },
  };

  constructor(breakpointService: BreakpointService, localeService: LocalizationService) {
    this.isMobile = breakpointService.matches(['sm']);

    localeService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.currentLocale = locale;
      });
  }

  setTheme(activeTabIndex: number): void {
    this.activeTheme = activeTabIndex === 0 ? 'light' : 'dark';
  }
}
