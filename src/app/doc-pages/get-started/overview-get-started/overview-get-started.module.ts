import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewGetStartedComponent } from './overview-get-started.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule,
    RouterModule,
  ],
  declarations: [OverviewGetStartedComponent],
})
export class OverviewGetStartedModule { }
