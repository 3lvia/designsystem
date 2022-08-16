import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPropertiesTableComponent } from './component-properties-table.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ComponentPropertiesTableComponent],
  exports: [ComponentPropertiesTableComponent],
})
export class ComponentPropertiesTableModule {}
