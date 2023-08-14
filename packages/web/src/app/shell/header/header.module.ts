import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import { MobileHeaderModule } from './mobile-menu/mobile-menu.module';
import { SearchMenuModule } from './search-menu/search-menu.module';
import '@elvia/elvis-modal';
import '@elvia/elvis-popover';

@NgModule({
  imports: [CommonModule, RouterModule, ThemeSwitchModule, SearchMenuModule, MobileHeaderModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
