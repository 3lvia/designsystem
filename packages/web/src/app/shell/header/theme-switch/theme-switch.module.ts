import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitchComponent } from './theme-switch.component';
import { ThemeService } from 'src/app/core/services/theme.service';

@NgModule({
  declarations: [ThemeSwitchComponent],
  exports: [ThemeSwitchComponent],
  imports: [CommonModule],
  providers: [ThemeService],
})
export class ThemeSwitchModule {}
