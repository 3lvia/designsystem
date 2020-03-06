import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityStartComponent } from './accessibility-start.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule
  ],
  declarations: [AccessibilityStartComponent],
  exports: [AccessibilityStartComponent]
})
export class AccessibilityStartModule { }
