import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview-comp.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
