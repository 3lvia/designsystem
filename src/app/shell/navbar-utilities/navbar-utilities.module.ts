import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUtilitiesComponent } from './navbar-utilities.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarUtilitiesComponent],
  exports: [NavbarUtilitiesComponent]
})
export class NavbarUtilitiesModule { }
