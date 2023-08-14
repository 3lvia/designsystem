import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DesktopNavbarComponent } from './desktop-navbar/desktop-navbar.component';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { ReversePipe } from './sub-menu/reverse.pipe';
import { NavbarBase } from './navbar-base';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DesktopNavbarComponent, MobileNavbarComponent, SubMenuComponent, ReversePipe, NavbarBase],
  exports: [DesktopNavbarComponent, MobileNavbarComponent, SubMenuComponent],
})
export class NavbarModule {}
