import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule,
    RouterModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
