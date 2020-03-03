import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTabsComponent } from './header-tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderTabsComponent],
  exports: [HeaderTabsComponent]
})
export class HeaderTabsModule { }
