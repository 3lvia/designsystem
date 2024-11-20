import { AsyncPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { BreakpointService } from '../core/services/breakpoint.service';
import { ThemeService } from '../core/services/theme.service';
import { FrontPageChangelogComponent } from './front-page-changelog/front-page-changelog.component';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { homeMenu } from 'src/app/shared/doc-pages';

type Holiday = 'Birthday' | 'Christmas' | 'Halloween' | 'Pride' | 'ConstitutionDay' | 'None';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [NgClass, RouterLink, FrontPageChangelogComponent, AsyncPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  pages = homeMenu;
  fontLoaded = false;
  holiday: Holiday = 'None';
  locale: Locale;
  currentTheme = inject(ThemeService).listenTheme();
  isMobileScreenWidth = inject(BreakpointService).matches(['xs']);

  get topImagePath(): string {
    if (this.holiday === 'Birthday') {
      return `assets/holidayIllustrations/Birthday${new Date().getFullYear()}.png`;
    } else if (this.holiday === 'Christmas') {
      return 'assets/holidayIllustrations/ChristmasIllustration.png';
    } else if (this.holiday === 'Halloween') {
      return 'assets/holidayIllustrations/Halloween.png';
    } else if (this.holiday === 'Pride') {
      return 'assets/holidayIllustrations/Pride.png';
    } else if (this.holiday === 'ConstitutionDay') {
      return 'assets/holidayIllustrations/ConstitutionDay.png';
    } else {
      return 'assets/HomeIllustration.png';
    }
  }

  get pageTitle(): string {
    if (this.holiday === 'Birthday') {
      return this.locale === 'en-GB' ? 'Happy Birthday' : 'Gratulerer med dagen';
    } else if (this.holiday === 'Christmas') {
      return this.locale === 'en-GB' ? 'Happy Holidays' : 'God jul';
    } else if (this.holiday === 'ConstitutionDay') {
      return 'Hipp Hipp Hurra';
    } else {
      return this.locale === 'en-GB' ? 'Elvia design system' : 'Elvia designsystem';
    }
  }

  constructor(
    localizationService: LocalizationService,
    private titleService: Title,
  ) {
    localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
      });
  }

  ngOnInit(): void {
    this.setHoliday();
    document.fonts.ready.then(() => {
      this.fontLoaded = true;
    });
    this.titleService.setTitle('Elvia design system');
  }

  private setHoliday = (): void => {
    const currentDate = new Date();
    const currentYear = new Date().getFullYear();
    const startDateBirthday = new Date(currentYear, 1, 14);
    const endDateBirthday = new Date(currentYear, 1, 20);
    const startDateConstitutionDate = new Date(currentYear, 4, 9);
    const endDateConstitutionDate = new Date(currentYear, 4, 17);

    if (currentDate.getMonth() === 9 && currentDate.getDate() >= 25) {
      this.holiday = 'Halloween';
    } else if (currentDate.getMonth() === 11) {
      this.holiday = 'Christmas';
    } else if (currentDate >= startDateBirthday && currentDate <= endDateBirthday) {
      this.holiday = 'Birthday';
    } else if (currentDate.getMonth() === 5) {
      this.holiday = 'Pride';
    } else if (currentDate >= startDateConstitutionDate && currentDate <= endDateConstitutionDate) {
      this.holiday = 'ConstitutionDay';
    }
  };
}
