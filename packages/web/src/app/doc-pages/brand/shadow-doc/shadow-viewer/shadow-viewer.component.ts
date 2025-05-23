import { AsyncPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeName } from '@elvia/elvis-colors';

import { CopyComponent } from '../../../../shared/copy/copy.component';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';

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
  imports: [NgClass, CopyComponent, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShadowViewerComponent {
  private breakpointService = inject(BreakpointService);
  private localizationService = inject(LocalizationService);

  currentLocale: Locale = 'en-GB';
  activeTheme: ThemeName = 'light';
  isMobile = this.breakpointService.matches(['sm']);
  shadows: Shadow[] = [
    { title: 'Soft', token: 'e-shadow-soft', blur: 50, opacity: 3 },
    { title: 'Medium', token: 'e-shadow-medium', blur: 40, opacity: 6 },
    { title: 'Hard', token: 'e-shadow-hard', blur: 30, opacity: 8 },
  ];
  noShadowOnDarkThemeTexts = {
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
  } as const satisfies Record<string, Record<Locale, string>>;

  constructor() {
    this.localizationService
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
