import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewIdentityComponent } from './overview-identity.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule,
  ],
  declarations: [OverviewIdentityComponent],
})
export class OverviewIdentityModule { }
