import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { LOCALE_CODE } from 'contentful/types';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { homeMenu } from 'src/app/shared/doc-pages';
import changelogJson from '@elvia/elvis/CHANGELOG.json';
import { Observable } from 'rxjs';
import { BreakpointService } from '../core/services/breakpoint.service';
import { ThemeService } from '../core/services/theme.service';
import { ThemeName } from '@elvia/elvis-colors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  overviewTitle = 'Elvia design system';
  pages = homeMenu;
  fontLoaded = false;
  isNonHoliday = true;
  isChristmas = false;
  isHalloween = false;
  isBirthday = false;
  isPride = false;
  isConstitutionDay = false;
  private currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  locale: LOCALE_CODE;
  currentTheme: ThemeName = 'light';
  changelog = changelogJson.content;
  isMobileScreenWidth: Observable<boolean>;

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
        if (locale === Locale['en-GB']) {
          this.overviewTitle = 'Elvia design system';
          this.locale = 'en-GB';
        } else {
          this.overviewTitle = 'Elvia designsystem';
          this.locale = 'nb-NO';
        }
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

  setHoliday = (): void => {
    const startDateBirthday = new Date(this.currentYear, 1, 14);
    const endDateBirthday = new Date(this.currentYear, 1, 20);
    const startDateConstitutionDate = new Date(this.currentYear, 4, 9);
    const endDateConstitutionDate = new Date(this.currentYear, 4, 17);

    this.isNonHoliday = false;
    if (this.currentDate.getMonth() === 9 && this.currentDate.getDate() >= 25) {
      this.isHalloween = true;
    } else if (this.currentDate.getMonth() === 11) {
      this.isChristmas = true;
      this.overviewTitle = 'Happy Holidays';
    } else if (this.currentDate >= startDateBirthday && this.currentDate <= endDateBirthday) {
      this.isBirthday = true;
      this.overviewTitle = 'Happy Birthday';
    } else if (this.currentDate.getMonth() === 5) {
      this.isPride = true;
    } else if (this.currentDate >= startDateConstitutionDate && this.currentDate <= endDateConstitutionDate) {
      this.isConstitutionDay = true;
      this.overviewTitle = 'Hipp Hipp Hurra';
    } else {
      this.isNonHoliday = true;
    }
  };
}
