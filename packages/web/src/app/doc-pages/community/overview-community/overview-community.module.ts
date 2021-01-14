import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewCommunityComponent } from './overview-community.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, OverviewPageModule, RouterModule],
  declarations: [OverviewCommunityComponent],
})
export class OverviewCommunityModule {}
