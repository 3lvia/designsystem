import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewPageComponent } from './overview-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [OverviewPageComponent],
  exports: [OverviewPageComponent]
})
export class OverviewPageModule { }
