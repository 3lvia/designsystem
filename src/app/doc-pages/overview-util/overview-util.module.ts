import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewUtilComponent } from './overview-util.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [OverviewUtilComponent]
})
export class OverviewUtilModule { }
