import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  date = new Date();
  christmasMonth = 11;
  christmas = false;
  halloweenMonth = 9;
  halloween = false;
  isBirthday = false;
  locale: string;
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
    this.holiday();
    (document as any).fonts.ready.then(() => {
      this.fontLoaded = true;
    });
    this.titleService.setTitle('Elvia design system');
    this.isMobileScreenWidth = window.innerWidth <= 430;
  }

  holiday = (): void => {
    // halloween
    if (this.date.getMonth() === this.halloweenMonth && this.date.getUTCDate() >= 25) {
      this.halloween = true;
    }
    // christmas
    if (this.date.getMonth() === this.christmasMonth) {
      this.christmas = true;
      this.overviewTitle = 'Happy Holidays';
    }

    // birthday
    const startDate = new Date(this.date.getFullYear(), 1, 16);
    const endDate = new Date(this.date.getFullYear(), 1, 18);
    if (this.date >= startDate && this.date <= endDate) {
      this.isBirthday = true;
      this.overviewTitle = 'Happy Birthday';
    }
  };

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => (this.isMobileScreenWidth = window.innerWidth <= 430);
}
