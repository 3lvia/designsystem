import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsStartComponent } from './components-start.component';
import { RouterModule } from '@angular/router';
import { NavbarComponentsModule } from 'src/app/shell/navbar-components/navbar-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponentsModule
  ],
  declarations: [ComponentsStartComponent],
  exports: [ComponentsStartComponent]

})
export class ComponentsStartModule { }
