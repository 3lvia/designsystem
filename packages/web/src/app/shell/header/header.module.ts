import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import '@elvia/elvis-modal';
import '@elvia/elvis-popover';

@NgModule({
  imports: [CommonModule, RouterModule, ThemeSwitchModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
