import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
