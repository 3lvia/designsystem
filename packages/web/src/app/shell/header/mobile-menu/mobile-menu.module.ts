import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from './mobile-menu.component';
import { RouterModule } from '@angular/router';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';

@NgModule({
  imports: [CommonModule, RouterModule, ThemeSwitchModule],
  declarations: [MobileMenuComponent],
  exports: [MobileMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MobileHeaderModule {}
