import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsStartComponent } from './components-start.component';
import { RouterModule } from '@angular/router';
import { NavbarComponentsModule } from 'src/app/shell/navbar-components/navbar-components.module';
import { NavbarModule } from 'src/app/shell/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponentsModule,
    NavbarModule
  ],
  declarations: [ComponentsStartComponent],
  exports: [ComponentsStartComponent]

})
export class ComponentsStartModule { }
