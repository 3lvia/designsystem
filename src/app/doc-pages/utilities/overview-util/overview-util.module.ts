import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewUtilComponent } from './overview-util.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule
  ],
  declarations: [OverviewUtilComponent]
})
export class OverviewUtilModule { }
