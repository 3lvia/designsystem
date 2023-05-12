import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LOCALE_CODE } from 'contentful/types';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { homeMenu } from 'src/app/shared/doc-pages';
import changelogJson from 'src/assets/changelogs/elvis/CHANGELOG.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  overviewTitle = 'Elvia design system';
  pages = homeMenu;
  fontLoaded = false;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  christmasMonth = 11;
  halloweenMonth = 9;
  prideMonth = 5;
  isNonHoliday = true;
  isChristmas = false;
  isHalloween = false;
  isBirthday = false;
  isPride = false;
  isConstitutionDay = false;
  locale: LOCALE_CODE;
  changelog = changelogJson.content;

  screenWidth: number;
  isMobileScreenWidth: boolean;

  constructor(localizationService: LocalizationService, private titleService: Title) {
    localizationService.listenLocalization().subscribe((locale) => {
      if (locale === Locale['en-GB']) {
        this.overviewTitle = 'Elvia design system';
        this.locale = 'en-GB';
      } else {
        this.overviewTitle = 'Elvia designsystem';
        this.locale = 'nb-NO';
      }
    });
  }

  ngOnInit(): void {
    this.setHoliday();
    (document as any).fonts.ready.then(() => {
      this.fontLoaded = true;
    });
    this.titleService.setTitle('Elvia design system');
    this.isMobileScreenWidth = window.innerWidth <= 430;
  }

  setHoliday = (): void => {
    const startDateBirthday = new Date(this.currentYear, 1, 14);
    const endDateBirthday = new Date(this.currentYear, 1, 20);
    const startDateConstitutionDate = new Date(this.currentYear, 4, 9);
    const endDateConstitutionDate = new Date(this.currentYear, 4, 17);

    this.isNonHoliday = false;
    if (this.currentMonth === this.halloweenMonth && this.currentDate.getUTCDate() >= 25) {
      this.isHalloween = true;
    } else if (this.currentMonth === this.christmasMonth) {
      this.isChristmas = true;
      this.overviewTitle = 'Happy Holidays';
    } else if (this.currentDate >= startDateBirthday && this.currentDate <= endDateBirthday) {
      this.isBirthday = true;
      this.overviewTitle = 'Happy Birthday';
    } else if (this.currentMonth === this.prideMonth) {
      this.isPride = true;
    } else if (this.currentDate >= startDateConstitutionDate && this.currentDate <= endDateConstitutionDate) {
      this.isConstitutionDay = true;
    } else {
      this.isNonHoliday = true;
    }
  };

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => (this.isMobileScreenWidth = window.innerWidth <= 430);
}
