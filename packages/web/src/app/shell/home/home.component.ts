import { Component, OnInit, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { LOCALE_CODE } from 'contentful/types';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { homeMenu } from 'src/app/shared/doc-pages';
import changelogJson from '@elvia/elvis/CHANGELOG.json';

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
  changelog = changelogJson.content;

  showShortcutGlossary = false;
  showShortcutGlossaryButton = false;
  private shortcutGlossaryTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private lastGPress: number;

  isMobileScreenWidth: boolean;

  constructor(localizationService: LocalizationService, private titleService: Title) {
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

  openShortcutGlossary = (): void => {
    this.showShortcutGlossary = true;
  };

  closeShortcutGlossary = (): void => {
    this.showShortcutGlossary = false;
  };

  @HostListener('window:keypress', ['$event'])
  handleShortcutGlossary = (event: KeyboardEvent): void => {
    const shortcutGlossary = (event.target as HTMLElement)?.closest('#elvia-shortcut-glossary-modal');

    if (!shortcutGlossary && event.target !== document.body) {
      return;
    }

    const keyPressed = event.key.toLowerCase();
    if (keyPressed === 'g') {
      this.lastGPress = Date.now();
      if (!this.showShortcutGlossary) {
        this.shortcutGlossaryTimeoutId = setTimeout(this.openShortcutGlossary, 250);
      }
      //handle s-key, others are handled by navigation
    } else if (keyPressed === 's' && Date.now() - this.lastGPress <= 1000) {
      clearTimeout(this.shortcutGlossaryTimeoutId);
      this.closeShortcutGlossary();
    } else {
      clearTimeout(this.shortcutGlossaryTimeoutId);
    }
  };

  @HostListener('window:keydown.tab', ['$event'])
  handleShortcutGlossaryButton = (): void => {
    this.showShortcutGlossaryButton = true;
  };

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => (this.isMobileScreenWidth = window.innerWidth <= 430);
}
