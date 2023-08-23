import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeName } from '@elvia/elvis-colors';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  mainMenu: CMSMenu;
  isLoaded = false;
  currentTheme: Observable<ThemeName>;

  get devMode(): boolean {
    return (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('elvis-designsystem.netlify.app') > -1 ||
      window.location.href.indexOf('#dev') > -1
    );
  }

  private onDestroy = new Subject<void>();
  onDestroy$ = this.onDestroy.asObservable();

  constructor(
    private router: Router,
    private cmsService: CMSService,
    private localizationService: LocalizationService,
    themeService: ThemeService,
  ) {
    this.currentTheme = themeService.listenTheme();

    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.cmsService.getMenu(locale).then((data) => {
          this.mainMenu = data;
          this.isLoaded = true;
        });
      });
  }

  onClose(): void {
    this.onDestroy.next();
  }

  navigate(path?: string): void {
    if (!path) return;
    this.router.navigate(['/' + path]);
    this.onClose();
  }
}
