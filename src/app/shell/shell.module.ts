import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './main/main.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  imports: [
    HeaderModule,
    HomeModule,
    MainModule,
    NavbarModule
  ],
})
export class ShellModule { }

