import { NgModule } from '@angular/core';
import { ColorModule } from './color/color.module';

// TODO: Move ColorModule to brand later, not doing now to avoid merge conflict hell
@NgModule({
  imports: [ColorModule],
})
export class OtherPagesModule {}
