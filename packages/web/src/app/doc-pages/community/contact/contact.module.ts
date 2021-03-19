import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule],
  declarations: [ContactComponent],
})
export class ContactModule {}
