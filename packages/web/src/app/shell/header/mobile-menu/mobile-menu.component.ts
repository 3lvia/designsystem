import { CUSTOM_ELEMENTS_SCHEMA, Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { CMSMenu } from 'src/app/core/services/cms/cms.interface';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  imports: [RouterLink, ThemeSwitchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MobileMenuComponent {
  readonly closeMenu = output<void>();
  // @ts-expect-error TS2564 (LEGO-3683)
  mainMenu: CMSMenu;
  isLoaded = false;

  get devMode(): boolean {
    return (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('elvis-designsystem.netlify.app') > -1 ||
      window.location.href.indexOf('#dev') > -1
    );
  }

  constructor(
    private cmsService: CMSService,
    private localizationService: LocalizationService,
  ) {
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
}
