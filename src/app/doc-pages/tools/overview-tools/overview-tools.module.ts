import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewToolsComponent } from './overview-tools.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule,
  ],
  declarations: [OverviewToolsComponent],
})
export class OverviewToolsModule { }
