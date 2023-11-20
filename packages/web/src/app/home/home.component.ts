import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { homeMenu } from 'src/app/shared/doc-pages';
import changelogJson from '@elvia/elvis/CHANGELOG.json';
import { Observable } from 'rxjs';
import { BreakpointService } from '../core/services/breakpoint.service';
import { ThemeService } from '../core/services/theme.service';
import { ThemeName } from '@elvia/elvis-colors';

type Holiday = 'Birthday' | 'Christmas' | 'Halloween' | 'Pride' | 'ConstitutionDay' | 'None';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pages = homeMenu;
  fontLoaded = false;
  holiday: Holiday = 'None';
  locale: Locale;
  currentTheme: ThemeName = 'light';
  changelog = changelogJson.content;
  isMobileScreenWidth: Observable<boolean>;

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
    breakpointService: BreakpointService,
    private themeService: ThemeService,
    private titleService: Title,
  ) {
    this.isMobileScreenWidth = breakpointService.matches(['xs']);

    localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale;
      });
    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((theme) => {
        this.currentTheme = theme;
      });
  }

  ngOnInit(): void {
    this.setHoliday();
    (document as any).fonts.ready.then(() => {
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
