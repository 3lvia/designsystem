import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './main/main.module';
import { NavbarModule } from './navbar/navbar.module';
import { HeaderTabsModule } from './header-tabs/header-tabs.module';
import { NavbarAccessibilityModule } from './navbar-accessibility/navbar-accessibility.module';
import { NavbarComponentsModule } from './navbar-components/navbar-components.module';

@NgModule({
  imports: [
    HeaderModule,
    HeaderTabsModule,
    HomeModule,
    MainModule,
    NavbarModule,
    NavbarAccessibilityModule,
    NavbarComponentsModule
  ],
})
export class ShellModule { }

