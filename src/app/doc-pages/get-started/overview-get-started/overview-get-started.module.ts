import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewGetStartedComponent } from './overview-get-started.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule,
  ],
  declarations: [OverviewGetStartedComponent],
})
export class OverviewGetStartedModule { }
