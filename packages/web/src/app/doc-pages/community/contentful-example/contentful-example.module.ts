import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfulExampleComponent } from './contentful-example.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule],
  declarations: [ContentfulExampleComponent],
})
export class ContentfulExampleModule { }
