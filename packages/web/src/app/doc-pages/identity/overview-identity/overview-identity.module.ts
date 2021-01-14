import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewIdentityComponent } from './overview-identity.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, OverviewPageModule, RouterModule],
  declarations: [OverviewIdentityComponent],
})
export class OverviewIdentityModule {}
