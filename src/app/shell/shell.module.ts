import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './main/main.module';
import { NavbarModule } from './navbar/navbar.module';
import { NavbarAccessibilityModule } from './navbar-accessibility/navbar-accessibility.module';
import { NavbarComponentsModule } from './navbar-components/navbar-components.module';
import { NavbarUtilitiesModule } from './navbar-utilities/navbar-utilities.module';

@NgModule({
  imports: [
    HeaderModule,
    HomeModule,
    MainModule,
    NavbarModule,
    NavbarAccessibilityModule,
    NavbarComponentsModule,
    NavbarUtilitiesModule
  ],
})
export class ShellModule { }

