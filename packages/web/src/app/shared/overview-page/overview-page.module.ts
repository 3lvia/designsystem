import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewPageComponent } from './overview-page.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';

@NgModule({
  imports: [CommonModule, RouterModule, NavbarModule],
  declarations: [OverviewPageComponent],
  exports: [OverviewPageComponent],
})
export class OverviewPageModule {}
