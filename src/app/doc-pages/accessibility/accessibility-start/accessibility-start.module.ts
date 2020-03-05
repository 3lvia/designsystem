import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityStartComponent } from './accessibility-start.component';
import { RouterModule } from '@angular/router';
import { NavbarAccessibilityModule } from 'src/app/shell/navbar-accessibility/navbar-accessibility.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarAccessibilityModule,
  ],
  declarations: [AccessibilityStartComponent],
  exports: [AccessibilityStartComponent]
})
export class AccessibilityStartModule { }
