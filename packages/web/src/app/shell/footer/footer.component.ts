import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  bgClass = '';
  locale: string;

  date = new Date();
  currentYear;
  showLocaleToggle = window.location.href.indexOf('localhost') > -1 ? true : false;

  constructor(private router: Router, private localizationService: LocalizationService) {
    this.localizationService.listenLocalization().subscribe((locale) => {
      if (locale === Locale['en-GB']) {
        this.locale = 'en-GB';
      } else {
        this.locale = 'no-NB';
      }
    });

    // subscribe to router navigation
    this.router.events.subscribe((event) => {
      // filter `NavigationEnd` events
      if (event instanceof NavigationEnd) {
        // get current route without leading slash `/`
        const eventUrl = event.urlAfterRedirects;
        // set bgClass property with the value of the current route
        if (eventUrl === '/not-found') {
          this.bgClass = 'not-found';
        } else {
          this.bgClass = '';
        }
      }
    });
  }
  ngOnInit(): void {
    this.currentYear = this.date.getFullYear();
  }

  setLocale(str: string) {
    this.localizationService.setLocalization(Locale[str]);
  }
}
