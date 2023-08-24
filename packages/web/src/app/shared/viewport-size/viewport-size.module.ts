import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfViewportSizeDirective } from './if-viewport-size.directive';

@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [CommonModule],
  exports: [IfViewportSizeDirective],
})
export class ViewportSizeModule {}
