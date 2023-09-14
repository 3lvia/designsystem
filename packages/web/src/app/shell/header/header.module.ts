import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import '@elvia/elvis-modal';
import '@elvia/elvis-popover';
import '@elvia/elvis-divider';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [HeaderComponent, SearchMenuComponent, MobileMenuComponent, ThemeSwitchComponent],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
