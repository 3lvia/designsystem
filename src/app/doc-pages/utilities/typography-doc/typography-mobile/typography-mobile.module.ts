import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyMobileComponent } from './typography-mobile.component';
import { CopyModule } from 'src/app/shared/copy/copy.module';

@NgModule({
  imports: [
    CommonModule,
    CopyModule
  ],
  declarations: [TypographyMobileComponent]
})
export class TypographyMobileModule { }
