import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesStartComponent } from './utilities-start.component';
import { RouterModule } from '@angular/router';
import { NavbarUtilitiesModule } from 'src/app/shell/navbar-utilities/navbar-utilities.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarUtilitiesModule,
  ],
  declarations: [UtilitiesStartComponent]
})
export class UtilitiesStartModule { }
