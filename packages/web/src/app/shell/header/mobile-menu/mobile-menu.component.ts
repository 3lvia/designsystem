import { CUSTOM_ELEMENTS_SCHEMA, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { mainMenuItems } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  imports: [RouterLink, ThemeSwitchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MobileMenuComponent {
  readonly closeMenu = output<void>();

  mainMenuItems = mainMenuItems;

  get devMode(): boolean {
    return (
      window.location.href.indexOf('localhost') > -1 ||
      window.location.href.indexOf('azurestaticapps.net') > -1 ||
      window.location.href.indexOf('#dev') > -1
    );
  }
}
