import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponentsComponent } from './navbar-components.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponentsComponent],
  exports: [NavbarComponentsComponent]
})
export class NavbarComponentsModule { }
