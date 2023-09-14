import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import { FormsModule } from '@angular/forms';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import '@elvia/elvis-modal';
import '@elvia/elvis-popover';
import '@elvia/elvis-divider';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ThemeSwitchModule],
  declarations: [HeaderComponent, SearchMenuComponent, MobileMenuComponent],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
