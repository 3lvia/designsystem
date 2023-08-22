import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { IfViewportSizeDirective } from './if-viewport-size.directive';

@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [CommonModule, LayoutModule],
  exports: [IfViewportSizeDirective],
})
export class ViewportSizeModule {}
