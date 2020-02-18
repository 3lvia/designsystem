import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ButtonPreviewComponent } from '../../button-preview/button-preview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent, ButtonPreviewComponent],
  exports: [MainComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MainModule { }
