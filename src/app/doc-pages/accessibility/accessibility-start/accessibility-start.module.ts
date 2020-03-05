import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityStartComponent } from './accessibility-start.component';
import { NavbarAccessibilityModule } from 'src/app/shell/navbar-accessibility/navbar-accessibility.module';
import { RouterModule } from '@angular/router';


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
