import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewAccessibilityComponent } from './overview-accessibility.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewPageModule
  ],
  declarations: [OverviewAccessibilityComponent]
})
export class OverviewAccessibilityModule { }
