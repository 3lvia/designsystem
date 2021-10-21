import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from './mobile-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MobileMenuComponent],
  exports: [MobileMenuComponent],
})
export class MobileHeaderModule {}
