import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewToolsComponent } from './overview-tools.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, OverviewPageModule, RouterModule],
  declarations: [OverviewToolsComponent],
})
export class OverviewToolsModule {}
