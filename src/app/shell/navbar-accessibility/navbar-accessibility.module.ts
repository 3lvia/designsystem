import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAccessibilityComponent } from './navbar-accessibility.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarAccessibilityComponent],
  exports: [NavbarAccessibilityComponent]
})
export class NavbarAccessibilityModule { }
