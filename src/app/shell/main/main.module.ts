import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    NavbarModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule { }
