import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesStartComponent } from './utilities-start.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule
  ],
  declarations: [UtilitiesStartComponent]
})
export class UtilitiesStartModule { }
