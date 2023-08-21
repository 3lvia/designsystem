import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DesktopNavbarComponent } from './desktop-navbar/desktop-navbar.component';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { NavbarBase } from './navbar-base';
import { LocalePickerComponent } from './locale-picker/locale-picker.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    DesktopNavbarComponent,
    MobileNavbarComponent,
    SubMenuComponent,
    NavbarBase,
    LocalePickerComponent,
  ],
  exports: [DesktopNavbarComponent, MobileNavbarComponent, SubMenuComponent, LocalePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule {}
